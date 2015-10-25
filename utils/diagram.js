var Promise = require('bluebird');

module.exports = function(diagram) {
    return new Promise(function (resolve, reject) {
        resolve(diagram);
    });
};