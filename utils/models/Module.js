var $ = require('requirist')(
    'fs',
    'os',
    'vm',
    'path',

    'chalk',
    'escodegen',
    'esprima',
    'js-select as select',

    './utils/models/Interceptor',
    './utils/selectors',
    './utils/get-undeclared as undeclaredIn'
);

/**
 * Simple doubler
 * @param string
 */
function twice(string) {
    return string + string;
}

/**
 * Module model, heavily loaded with parser logic.
 *
 * @param {Object} definition AST Leaf which is satisfies to #isModuleDefinition criteria
 * @constructor
 */
function Module(definition) {
    if (definition) {
        this.load(definition);
    }
}

Module.prototype = {

    /**
     * Stores the name of module
     */
    name: 'anonymous',

    /**
     * Stores module's dependencies by their names
     */
    dependencies: [],

    /**
     * Stores statistics of module's code
     */
    stats: {
        // Number of functions declared within module
        functions: 0,
        // Number of identifiers used in module
        identifiers: 0
    },

    /**
     * Stores module's description
     */
    description: 'This module has no description yet.',

    /**
     * Stores module's location
     */
    location: {
        start: 0,
        end: 0
    },

    /**
     * Stores description of module export
     */
    exports: {},

    /**
     * Loads the given AST leaf to the model, performing its inspection.
     * TODO: Add location node checks
     *
     * @param {Object} definition
     */
    load: function(definition) {
        // Arguments of module definition i.e. what's 'define' called with.
        var args = definition.expression.arguments;
        // Module body, function passed to 'define'
        var body = args[1].type === 'FunctionExpression' ?
            args[1] : args[2];

        // define('name');
        this.name = args[0].value;
        // define('name', ['dependency']);
        this.dependencies = args[1].type === 'ArrayExpression' ?
            args[1].elements.map(element => element.value) : [];

        // some funky numbers
        this.stats = this._collectModuleStats(definition);

        // parse leading comments before a module, just as this one
        this.description = definition.leadingComments ?
            this._parseLeadingComments(definition.leadingComments) :
            this.description;

        // Actually, these numbers doesn't mean much, except maybe
        // difference (end - start)
        this.location = {
            start: definition.loc.start.line,
            end: definition.loc.end.line
        };

        // What the module function exports
        this.exports = this._parseModuleExports(body);
    },

    /**
     * Collects the static numbers over the module code.
     *
     * @param definition
     * @returns {Object}
     */
    _collectModuleStats: function(definition) {
        return {
            functions: $.select(definition, $.selectors.FUNCTION).nodes().length,
            identifiers: $.select(definition, $.selectors.IDENTIFIER).nodes().length
        }
    },

    /**
     * Parses the Leading comments before module definition.
     *
     * @param {Array} comments Array of leadingComments from the AST leaf
     */
    _parseLeadingComments: function(comments) {
        var previousLine = comments[0].loc.start.line;

        return comments.map(comment => {
            var extraLine = comment.loc.start.line - previousLine >= 1 ? twice($.os.EOL) : '';
            var value = extraLine + comment.value;

            previousLine = comment.loc.end.line;

            return value.trim();
        }).join($.os.EOL);
    },

    /**
     * Parses the module body, trying to find what it does with its environment.
     * The basic principle is simply to generate executable sandbox, which can record the operations,
     * performed by module during instantiation.
     *
     * @param {Object} body Module Body function
     */
    _parseModuleExports: function(body) {
        // Create module code for dynamic analysis
        var moduleCode = $.escodegen.generate(body);
        // Which will later stored in a file
        var moduleFile = './modules/' + this.name.replace('/', '.') + '.js';
        var interceptorCode = $.fs.readFileSync('./utils/models/Interceptor.js', 'utf-8').replace('module.exports = Interceptor;', '');

        // Adding module definition

        // Naming the module function as 'execute',
        //
        // function () {} -> function execute() {}
        // function $AMD$() {} -> function execute() {}
        moduleCode = moduleCode.replace(/function\s\$[\w]+\$|function\s/, 'function execute');
        // then inject interceptor implementation TODO: inject simple require call
        moduleCode = interceptorCode + $.os.EOL +
        // then inject interceptors for all global variables
        // (which are undeclared in module's body)
        ($.undeclaredIn(body).map(function(def) {
            return 'var ' + def + ' = Interceptor()';
        }).join($.os.EOL)) + $.os.EOL +
        // then the module code itself
        moduleCode + $.os.EOL +
        // and export the executor
        'module.exports = execute;';

        // Write the file to be able to require it later.
        // TODO: Investigate vm's capabilities to bypass execution
        $.fs.writeFileSync(moduleFile, moduleCode);

        // get the executable file.
        var executable = require($.path.join(process.cwd(), moduleFile));
        // Create arguments for our 'execute' function defined above
        var args = this.dependencies.map(function(dep) {
            return $.Interceptor();
        });
        // And allocate some memory for result
        var result;

        try {
            // Execute the module body
            result = executable.apply(null, args);
        } catch(e) {
            console.error($.chalk.blue(this.name), $.chalk.red(e));
            console.log(e.stack);
        }

        // TODO: Replace with description
        for (var k in result) {
            if (typeof result[k] === 'function') {
                result[k] = result[k].toString();
            }
        }

        return result;
    }
};

/**
 * Checks whether the given object is looks similar to module definition.
 *
 * @param {Object} object
 *
 * @returns {boolean}
 * @static
 */
Module.isModuleDefinition = function(object) {
    return object.type === 'ExpressionStatement' &&
        object.expression.type === 'CallExpression' &&
        object.expression.callee.name === 'define';
};

module.exports = Module;