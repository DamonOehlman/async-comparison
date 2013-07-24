var fs = require('fs')

function readDirs(dir, cb) {
  fs.readdir(dir, function (err, ls) {
    if(err) return cb(err)
    var n = 0, dirs = []
    ls.forEach(function (d) {
      n++
      fs.stat(d, function (err, stat) {
        if(err) return cb(err)
        if(stat.isDirectory()) dirs.push(d)
        next()
      })
    })
    function next () {
      if(--n) return
      cb(null, dirs)
    }
    if(!n) next()
  })
}

if(!module.parent)
  readDirs(process.cwd(), console.log)
