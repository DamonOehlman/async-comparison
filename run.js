#!/usr/bin/env node

var fs = require('fs')
var exec = require('child_process').exec

var imps = fs.readdirSync('child-dirs').filter(function(name){
	return fs.statSync('child-dirs/' + name).isDirectory()
})

var i = 0
function next(e){
	if (i < imps.length) {
		var name = imps[i++]
		var imp = 'child-dirs/' + name
		if (fs.existsSync(imp + '/package.json')) {
			console.log('installing %s', imp)
			exec('cd child-dirs/' + name + ' && npm install && cd .. && cd ..', function(e){
				if (e) throw e
				run(imp)
			})
		} else {
			run(imp)
		}
	}
}

function run(imp){
	console.log('running %s', imp)
	exec('node --harmony-generators ' + imp, function(e, out){
		if (e) throw e
		console.log(out)
		next()
	})
}

next()