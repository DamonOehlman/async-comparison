var fs = require("fs")
var path = require("path")
var async = require("gens")
var parallel = require("continuable-para")
 
var findSamples = async(function* (targetPath) {
    var files = yield fs.readdir.bind(null, targetPath)
 
    var stats = yield parallel(files.map(function (fileName) {
        var uri = path.join(targetPath, fileName)
        return fs.stat.bind(null, uri)
    }))
 
    return files.filter(function (fileName, index) {
        return stats[index].isDirectory()
    }).map(path.basename)
})
 
// usage
findSamples(process.cwd(), function (err, folders) {
    console.log(err || folders);
})