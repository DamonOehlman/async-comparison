
var filter = require('filter/async')
var lift = require('when/decorate')
var fs = require('resultify/fs')

var isDir = lift(function(stat){
	return stat.isDirectory()
})

function childDirs(dir){
	return filter(fs.readdir(dir), function(name){
	  return isDir(fs.stat(dir + '/' + name))
	})
}

childDirs(process.cwd()).read(console.log)