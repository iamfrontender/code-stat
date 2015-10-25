var $ = require('requirist')(
    'fs',
    'jade',
    'bluebird as Promise'
);

module.exports = function (modules) {
    return new $.Promise(function (resolve, reject) {
        $.fs.writeFile('./dist/modules.json', JSON.stringify(modules), err => resolve(err));
    });
};