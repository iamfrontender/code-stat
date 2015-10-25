var fs = require('fs');
var esprima = require('esprima');
var scope = require('ecma-variable-scope');
var select = require('js-select');
var traverse = require('traverse');
var uniq = require('lodash.uniq');

var Module = require('./utils/models/Module');
var ast = esprima.parse(fs.readFileSync('./modules/promise.js', 'utf-8'), {
    loc: true,
    attachComments: true
});

var mod = new Module(ast.body[0]);

console.log(mod);