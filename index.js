#!/usr/bin/env node 

/*

	Notes:

		* null

*/

var spawn = require('child_process').spawn;
var bashcoin = spawn('./node_modules/bashcoin/bashcoin.js',['-c','-A']);
var brain = require('brain');
var NeuralNetwork = brain.NeuralNetwork;
var neuralNetwork = new NeuralNetwork();
var trainedCounter = 0;
var lastUpdate = {
	buy: null,
	sell: null,
	high: null,
	low: null,
	avg: null,
	vol: null,
	vwap: null,
	last: null,
	spread: null
};
var updates = [];
var cash = 1000.01;
var btc = 1.1;

function stream(s) {
	process.stdout.write('\r');
	process.stdout.write(s);
}

bashcoin.stdout.on('data',function(d){
	function parse(p) {
		var u = {};
		var j = p.toString().split('\n');
		for (var i in j) {
			j[i] = j[i].replace(' ','')
			var k = j[i].split('\t');
			if (k[1]) {
				if (k[1].indexOf('BTC') > 0) {
					u[k[0]] = parseFloat(k[1].split('BTC')[0]);
				} else {
					var x = k[1].split('$');
					u[k[0]] = parseFloat(x[x.length-1]);
				}
			}
		}
		return u;
	}
	function process_(u) {
		for (var i in u) {
			lastUpdate[i] = u[i];
		}
	}
	function clone(c) {
		var _ = {};
		for (var i in c) {
			_[i] = c[i];
		}
		return _;
	}
	var update = parse(d);
	process_(update);
	updates.push(
		{
			input: clone(lastUpdate),
			output: {
				date_: new Date().getTime()
			}
		}
	);
	//console.log(updates);
	// [{input:{update},output:{time}},{},{}]
	neuralNetwork.train(updates);
	trainedCounter++;
	stream(
		' \033[34m#\033[0m ' + bashcoin.pid +
		' \033[35mt\033[0m ' + trainedCounter +
		' \033[32m$\033[0m ' + cash +
		' \033[33mBTC\033[0m ' + btc
	);
});

bashcoin.stderr.on('data',function(d){
	process.stdout.write(d);
});

bashcoin.on('close',function(d){
	process.stdout.write(d);
});