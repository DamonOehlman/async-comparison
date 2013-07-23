var fs = require('fs');
var path = require('path');
var pull = require('pull-stream');

function findSamples(targetPath, callback) {
  fs.readdir(targetPath, function(err, files) {
    if (err) return callback(err);

    pull(
      pull.values(files),

      // join the path names and stat the files        
      pull.map(path.join.bind(null, targetPath)),
      pull.asyncMap(function(filename, callback) {
        fs.stat(filename, function(err, stats) {
          // create a compound object so we don't lose the filename
          // in the map transformation
          callback(err, { stats: stats, filename : filename });
        });
      }),

      // only keep directories
      pull.filter(function(data) {
        return data.stats.isDirectory();
      }),

      // transform back to a simple list of filenames
      pull.map(function(data) {
        return path.basename(data.filename);
      }),

      pull.collect(callback)
    );
  });
}

findSamples(process.cwd(), function(err, files) {
  console.log(err || files);
});