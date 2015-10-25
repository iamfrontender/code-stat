var fs = require('fs');
var Promise = require('bluebird');

module.exports = function(target) {
    return new Promise(function(resolve, reject) {
        var targetFile = require.resolve(target);

        fs.readFile(targetFile, 'utf-8', function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};