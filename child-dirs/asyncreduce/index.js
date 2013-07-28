var fs = require('fs')
var asyncreduce = require('asyncreduce');

var readDirs = module.exports = function (dir, done) {

  function reduce(accumulator, entry, cb) {
    fs.stat(entry, function (err, stat) {
      if (err) return cb(err);
      if (stat.isDirectory()) accumulator.push(entry);
      cb(null, accumulator);
    });
  }

  fs.readdir(dir, function (err, ls) {
    if (err) return done(err);
    asyncreduce(ls, [], reduce, done);
  });

};

if (!module.parent)
  readDirs(process.cwd(), console.log)
