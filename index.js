#!/usr/bin/env node 

var cp = require('child_process');
var n = cp.fork(__dirname+'/node_modules/bashcoin/bashcoin.js',['-c','-A']);


/*

var spawn = require('child_process').spawn;

var bashcoin = spawn('./node_modules/bashcoin/bashcoin.js',['-c','-A']);

console.log(bashcoin.pid);
bashcoin.stdin.end();
*/

/*

//var neuralnet = spawn('neuralnet');
var bashcoin = spawn('bashcoin',['-c','-A']);
//bashcoin.stdout.on('data',function(d){
//	neuralnet.stdin.write(d);
//});
bashcoin.stderr.on('data',function(d){
	console.log(d);
});

process.stdout.write('Mummy');


*/