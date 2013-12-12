#!/usr/bin/env node 

var spawn = require('child_process').spawn;
var bashcoin = spawn('./node_modules/bashcoin/bashcoin.js',['-c','-A']);
var brain = require('brain');
var NeuralNetwork = brain.NeuralNetwork;
var neuralNetwork = new NeuralNetwork();
neuralNetwork.trainingCounter = 0;

function log(l) {
	process.stdout.write('\r');
	process.stdout.write(l);
}

function parse(p) {
	//console.log(p.toString().split('\n'));
	var j = p.toString().split('\n');
	for (var i in j) {
		var k = j[i].slice('\t');
		// 
	}
}

bashcoin.stdout.on('data',function(d){
	neuralNetwork.trainingCounter++;
	log('\033[36mTrained '+neuralNetwork.trainingCounter+' times!\033[0m');
	//process.stdout.write(d);
	parse(d);
	//process(d);
});
bashcoin.stderr.on('data',function(d){
	process.stdout.write(d);
});
bashcoin.on('close',function(d){
	process.stdout.write(d);
});

/*
var cp = require('child_process');
var n = cp.fork(__dirname+'/node_modules/bashcoin/bashcoin.js',['-c','-A']);
*/

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