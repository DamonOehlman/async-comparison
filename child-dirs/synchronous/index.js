var fs = require('fs');
var path = require('path');

function findSamples(dir){
  return fs.readdirSync(dir).filter(function(name){
    return fs.statSync(dir + '/' + name).isDirectory()
  })
}

console.log(findSamples(process.cwd()));
