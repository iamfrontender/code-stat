var select = require('js-select');
var flatten = require('lodash.flatten');
var uniq = require('lodash.uniq');

var RESERVED_IDENTIFIERS = [
    'module', 'console', 'arguments',
    'apply', 'call', 'Object', 'Array',
    'prototype'
];

function hashSetToArray(hash) {
    return Object.keys(hash.data);
}

module.exports = function getUndeclared(ast) {
    // Module arguments (dependencies)
    var params = ast.params.map(param => param.name);
    // Scope object to inspect
    var scope = scopify(ast);

    // 1. Find all HashSets defining undeclared identifiers
    // 2. Convert it to array
    // 3. Flatten received array
    // 4. Make sure, all identifiers within are unique
    // 5. Filter the reserved global identifiers and module function arguments
    return uniq(flatten(select(scope, '.undeclared').nodes().map(function(hash) {
        return hashSetToArray(hash);
    }))).filter(function(identifier) {
        return RESERVED_IDENTIFIERS.indexOf(identifier) === -1 && params.indexOf(identifier) === -1;
    });
};

// slightly modified scopify-output gist from https://gist.github.com/Benvie/4657032
var scopify = (function(){

    // utilities

    var hidden = { enumerable: false };

    function hide(object, key){
        Object.defineProperty(object, key, hidden);
    }

    var definer = { configurable: true,
        enumerable: false,
        writable: true,
        value: undefined };

    function define(object, methods){
        methods.forEach(function(method){
            definer.value = method;
            Object.defineProperty(object, method.name, definer);
        });
        definer.value = undefined;

        return object;
    }

    function inherit(Ctor, Super, methods){
        Ctor.prototype = Object.create(Super.prototype);
        define(Ctor.prototype, methods);
    }



    function isObject(o){
        return typeof o === 'object' ? o !== null : typeof o === 'function';
    }

    function isLexicalDeclaration(node){
        return node.type === 'VariableDeclaration'
            && node.kind !== 'var';
    }


    // ###############
    // ### HashSet ###
    // ###############

    function HashSet(items){
        this.data = Object.create(null);
        this.size = 0;
        if (items) {
            this.add(items);
        }
    }

    define(HashSet.prototype, [
        function add(items){
            if (typeof items === 'string') {
                if (!(items in this.data)) {
                    this.data[items] = true;
                    this.size++;
                }
            } else if (items instanceof HashSet) {
                for (var item in items.data) {
                    this.add(item);
                }
            } else if (items instanceof Array) {
                for (var i = 0; i < items.length; i++) {
                    this.add(items[i]);
                }
            }
        },
        function has(item){
            return item in this.data;
        },
        function remove(item){
            if (item in this.data) {
                delete this.data[item];
                this.size--;

                return true;
            }

            return false;
        },
        function filter(callback, context){
            var index  = 0,
                result = new HashSet();

            context || (context = this);

            for (var item in this.data) {
                if (callback.call(context, item, index++, this)) {
                    result.add(item);
                }
            }

            return result;
        },
        function items(){
            var result = [];

            for (var item in this.data) {
                result.push(item);
            }

            return result;
        },
        function difference(set){
            return this.filter(function(item){
                return !set.has(item);
            });
        },
        function inspect(){
            return require('util').inspect(this.items());
        }
    ]);


    // #############
    // ### Scope ###
    // #############

    function Scope(){
        this.declared = new HashSet();
        this.undeclared = null;
        this.used = new HashSet();
        this.unused = null;
        this.children = [];
    }

    define(Scope.prototype, [
        function declare(kind, names){
            this.declared.add(names);
        },
        function use(names){
            this.used.add(names);
        },
        function close(){
            this.undeclared = this.used.difference(this.declared);
            this.unused = this.declared.difference(this.used);
        }
    ]);


    // ###################
    // ### GlobalScope ###
    // ###################

    function GlobalScope(){
        this.type = 'global';
        Scope.call(this);
    }

    inherit(GlobalScope, Scope, []);


    // #####################
    // ### FunctionScope ###
    // #####################

    function FunctionScope(node, outer){
        this.type = 'function';
        this.name = node.id ? node.id.name : '';
        if (node.type === 'FunctionExpression') {
            this.expression = true;
        }
        Scope.call(this);
        this.outer = outer;
        hide(this, 'outer');
        outer.children.push(this);
    }

    inherit(FunctionScope, Scope, [
        function close(){
            Scope.prototype.close.call(this);
            if (this.name && this.expression) {
                this.undeclared.remove(this.name);
            }
            this.outer.use(this.undeclared);
        }
    ]);


    // ##################
    // ### BlockScope ###
    // ##################

    function BlockScope(outer){
        this.type = 'block';
        Scope.call(this);
        this.outer = outer;
        hide(this, 'outer');
        outer.children.push(this);
    }

    inherit(BlockScope, Scope, [
        function close(){
            Scope.prototype.close.call(this);
            this.outer.use(this.undeclared);
        },
        function declare(kind, names){
            if (kind === 'var') {
                this.outer.declare(kind, names);
            } else {
                this.declared.add(names);
            }
        }
    ]);



    // bound names collectors

    var patterns = define({}, [
        function ArrayPattern(node, names){
            node.elements.forEach(function(element){
                element && boundNames(element, names);
            });
        },
        function Identifier(node, names){
            names.add(node.name);
        },
        function ObjectPattern(node, names){
            node.properties.forEach(function(property){
                boundNames(property.value, names);
            });
        }
    ]);

    function boundNames(node, names){
        names || (names = new HashSet());
        patterns[node.type](node, names);
        return names;
    }


    var scanners = define({}, [
        function ArrayPattern(node, scope){
            node.elements.forEach(function(element){
                element && scanNode(element, scope);
            });
        },
        function BlockStatement(node, scope){
            var childScope = new BlockScope(scope);
            scanEach(node.body, childScope);
            childScope.close();
        },
        function ForStatement(node, scope){
            if (node.init && isLexicalDeclaration(node.init)) {
                var childScope = new BlockScope(scope);
                scanEach(node, childScope);
                childScope.close();
            } else {
                scanEach(node, scope);
            }
        },
        function ForInStatement(node, scope){
            if (isLexicalDeclaration(node.left)) {
                var childScope = new BlockScope(scope);
                scanEach(node, childScope);
                childScope.close();
            } else {
                scanEach(node, scope);
            }
        },
        function ForOfStatement(node, scope){
            scanners.ForInStatement(node, scope);
        },
        function FunctionDeclaration(node, scope){
            scope.declare('let', node.id.name);
            scanners.FunctionExpression(node, scope);
        },
        function FunctionExpression(node, scope){
            var childScope = new FunctionScope(node, scope);
            scanEach(node.body.body, childScope);
            childScope.close();
        },
        function Identifier(node, scope){
            scope.use(node.name);
        },
        function ObjectPattern(node, scope){
            node.properties.forEach(function(property){
                scanNode(property, scope);
            });
        },
        function VariableDeclaration(node, scope){
            node.declarations.forEach(function(decl){
                scanNode(decl.init, scope);
                scope.declare(node.kind, boundNames(decl.id));
            });
        },
        function WithStatement(node, scope){
            // can't do static analysis =(
        }
    ]);


    // recursive AST node walkers

    function scanEach(node, scope){
        if (node.type) {
            for (var k in node) {
                scanNode(node[k], scope);
            }
        } else if (node instanceof Array) {
            for (var i=0; i < node.length; i++) {
                scanNode(node[i], scope);
            }
        }
    }

    function scanNode(node, scope){
        if (isObject(node)){
            if (node.type in scanners) {
                scanners[node.type](node, scope);
            } else {
                scanEach(node, scope);
            }
        }
    }


    // exported function

    return function scopify(node){
        var scope = new GlobalScope();

        scanEach(node.body, scope);
        scope.close();

        return scope;
    };
})();