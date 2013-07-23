var fs = require('fs');
var path = require('path');

function findSamples(targetPath, callback) {
  var files = fs.readdirSync(targetPath);

  // get the full path names of the files
  files = files.map(path.join.bind(null, targetPath));

  // stat each of the files
  var stats = files.map(fs.statSync);

  // remove files that aren't a directory
  var matchingFiles = files.filter(function(filename, index) {
    return stats[index].isDirectory();
  });

  return matchingFiles.map(path.basename);
}

try {
  console.log(findSamples(process.cwd()));
} catch (ex) {
  console.log(ex);
}