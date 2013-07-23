var Q = require("q");
var fs = require("fs");
var readDir = Q.nbind(fs.readdir);
var stat = function(file) {
    return Q.nfcall(fs.stat, file).then(function(stat) {
        return {
            file: file,
            stat: stat
        };
    });
};

readDir(process.cwd()).then(function(files) {

    return Q.all(files.map(stat));

}).then(function(files) {

    return files.filter(function(file) {
        return file.stat.isDirectory();
    }).map(function(file) {
        return file.file;
    });

}).then(function(dirs) {

    console.log(dirs);

}, function(err){
    console.log(err);
});