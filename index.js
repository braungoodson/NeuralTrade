#!/usr/bin/env node 

/*

	Notes:

		* null

*/

var spawn = require('child_process').spawn;
var bashcoin = spawn('./node_modules/bashcoin/bashcoin.js',['-c','-A']);
var brain = require('brain');
var NeuralNetwork = brain.NeuralNetwork;
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
var cash = 10000;
var btc = 0;
var rate = 0;
var prediction;
var output = [];
var s;
var buyout = 0;
var predictions = null;

function stream(s) {
	process.stdout.write('\r');
	process.stdout.write(s);
}

function buy(r) {
	if ((1 * r) <= cash) {
		var numBitcoins = 1;
		cash = cash - (numBitcoins*r);
		btc = btc + numBitcoins;
	}
}

function sell(r) {
	if (btc >= 1) {
		var numBitcoins = 1;
		cash = cash + (numBitcoins*r);
		btc = btc - numBitcoins;
	}
}

bashcoin.stdout.on('data',function(d){
	if (d.length > 1) {
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
				_[i] = c[i] * .00000001;
			}
			return _;
		}
		var update = parse(d);
		process_(update);
		updates.push(
			{
				input: {
					date_: new Date().getTime()
				},
				output: clone(lastUpdate)
			}
		);
		var neuralNetwork = new NeuralNetwork();
		neuralNetwork.train(updates);
		output.push(neuralNetwork.run({
			date_: new Date().getTime() + 30000
		}));
		trainedCounter++;
		if (output.length > 1) {
			if (output[output.length-1].buy > output[output.length-2].buy) {
				prediction = 'buy';
				buy(lastUpdate.buy);
			} else if (output[output.length-1].buy < output[output.length-2].buy) {
				prediction = 'sell';
				sell(lastUpdate.sell);
			} else {
				prediction = 'stay';
			}
		}
		buyout = (btc * lastUpdate.sell) + cash;
		s = ' \033[35mt\033[0m ' + trainedCounter +
			' \033[32m$\033[0m ' + cash +
			' \033[33mBTC\033[0m ' + btc +
			' \033[36mRate\033[0m ' + ((lastUpdate.buy+lastUpdate.sell)/2) +
			' \033[31mPrediction\033[0m ' + prediction +
			' \033[34mBuyout\033[0m ' + buyout;
		predictions = {
			t: trainedCounter,
			cash: cash,
			btc: btc,
			rate: rate,
			prediction: prediction,
			buyout: buyout,
			profit: buyout - 10000
		};
		console.log(s);
	}
});

bashcoin.stderr.on('data',function(d){
	process.stdout.write(d);
});

bashcoin.on('close',function(d){
	process.stdout.write(d);
});

var mario = require('mario-mario');
mario.plumbing({
	http: {
		get: {
			'/echo': function (q,r) {
				return r.send({echo : 'echo'});
			},
			'/predictions': function(q,r) {
				return r.send(predictions);
			}
		}
	}
});