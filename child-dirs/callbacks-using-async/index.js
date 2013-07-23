var fs = require('fs');
var path = require('path');
var async = require('async');

function findSamples(targetPath, callback) {
  fs.readdir(targetPath, function(err, files) {
    if (err) return callback(err);

    // get the full path names of the files
    files = files.map(function(name){
      return path.join(targetPath, name)
    });

    // stat each of the files
    async.map(files, fs.stat, function(err, results) {
      var matchingFiles;

      if (err) return callback(err);

      // remove files that aren't a directory
      matchingFiles = files.filter(function(filename, index) {
        return results[index].isDirectory();
      });

      callback(null, matchingFiles.map(path.basename));
    });
  });
}

findSamples(process.cwd(), function(err, results) {
  console.log(err || results);
});