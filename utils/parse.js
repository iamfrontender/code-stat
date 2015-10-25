var $ = require('requirist')(
    'fs',
    'os',

    'esprima',
    'estraverse',
    'bluebird as Promise',

    './utils/models/Module'
);

module.exports = function (data) {
    return new $.Promise(function (resolve) {
        var modules = [];
        var ast = $.esprima.parse(data, {
            attachComment: true,
            loc: true
        });

        $.fs.writeFileSync('source.json', JSON.stringify(ast));
        // TODO: move to esquery
        $.estraverse.traverse(ast, {
            enter: function(node) {
                if ($.Module.isModuleDefinition(node)) {
                    modules.push(new $.Module(node));
                }
            }
        });

        resolve(modules);
    });
};