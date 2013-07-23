
var async = require('async');
var path = require('path');
var fs = require('fs');

function findSamples(dir, callback) {
  fs.readdir(dir, function(err, files) {
    if (err) return callback(err);
    async.filter(files, function(name, done){
      fs.stat(dir + '/' + name, function(e, stat){
        if (e) callback(e)
        else done(stat.isDirectory())
      })
    }, callback);
  });
}

findSamples(process.cwd(), function(err, results) {
  console.log(err || results);
});