var path = require('path');
var Promise = require('promise');
var fs = {
  readdir: Promise.denodeify(require('fs').readdir),
  stat: Promise.denodeify(require('fs').stat)
};

function findSamples(targetPath, callback) {
  return fs.readdir(targetPath).then(function(files) {
    // get the full path names of the files
    files = files.map(function(name){
      return path.join(targetPath, name)
    });

    //get a promise for all the `Stat` objects of each file
    var stats = Promise.all(files.map(function (path) {
      return fs.stat(path)
    }));

    //get the result of that promise
    return stats.then(function (stats) {
      //remove files that aren't a directory
      var matchingFiles = files.filter(function (filename, index) {
        return stats[index].isDirectory();
      })

      return matchingFiles.map(path.basename);
    });
  }).nodeify(callback);
}

findSamples(process.cwd(), function(err, results) {
  console.log(err || results);
});