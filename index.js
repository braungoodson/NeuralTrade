var h = require('https');
var N = require('brain').NeuralNetwork;

var trainingData = [];
var predictions = [];
var buyIn = 1500;
var cash = 1500;
var btc = 0;
var profit = 0;
var rate = 0;
var prediction;
var chip = .5;
var fee = .0025;

predictions.push({});

function _process(_) {
	console.log(_);
}

function buy(r) {
	var cost = ((r * chip) + fee);
	if (cost <= cash) {
		cash = cash - cost;
		btc = btc + chip;
	}
}

function sell(r) {
	var sale = (fee + (chip * r));
	if (btc >= chip) {
		cash = cash + sale;
		btc = btc - chip;
	}
}

function stay() {
	return null;
}

function chooseDestiny(a,b,buyRate,sellRate) {
	if (a.buy > b.buy) {
		buy(buyRate);
		prediction = 'buy';
	} else if (a.buy < b.buy) {
		sell(sellRate);
		prediction = 'sell';
	} else {
		stay();
		prediction = 'stay';
	}
}

function callback(d) {
	var n = new N();
	trainingData.push(d[1]);
	n.train(trainingData);
	var o = {
		date: (new Date().toUTCString() + 10000) * .00000000001
	};
	predictions.push(n.run(o));
	rate = ((d[0].sell+d[0].buy)/2);
	chooseDestiny(
		predictions[predictions.length-1],
		predictions[predictions.length-2],
		rate,
		rate
	);
	profit = (((btc * d[0].sell) + cash) - buyIn);
}

function process(p) {
	callback(p);
}

function parse(d) {
	var x = .000001;
	var y = .0000000001;
	var z = .00000000001;
	var i = {
		date: d.ticker.updated * z
	};
	var o = {
		buy: d.ticker.buy * x,
		sell: d.ticker.sell * x,
		high: d.ticker.high * x,
		low: d.ticker.low * x,
		avg: d.ticker.avg * x,
		vol: d.ticker.vol * y,
		vol_cur: d.ticker.vol_cur * y
	};
	return process([
		{buy:d.ticker.buy,sell:d.ticker.sell},
		{input:i,output:o}
	]);
}

function dump() {
	console.log('');
	console.log('          \033[32m$\033[0m '+cash);
	console.log('        \033[33mBTC\033[0m '+btc);
	console.log('     \033[34mProfit\033[0m '+profit);
	console.log('       \033[35mRate\033[0m '+rate);
	console.log(' \033[31mPrediction\033[0m '+prediction);
}

setInterval(function(){
	h.get('https://btc-e.com/api/2/btc_usd/ticker',function(r){
		var b = '';
		r.on('data',function(c){
			b += c;
		});
		r.on('end',function(d){
			try {
				var d = JSON.parse(b);
				parse(d);
			} catch (e) {
				console.log('\033[31m Could not parse feed: '+e+'\033[0m');
			}
			dump();
		});
	}).on('error',function(r){
		//
		console.log(' \033[31m Error: '+e);
	});
},10000)




















































/*
var request = require('request');
var assert = require('assert');
request('https://btc-e.com/api/2/btc_usd/ticker',function(e,r,b){
	assert(!e);
	console.log(b);
});
*/

/*

var https = require('https');
https.get('https://btc-e.com/api/2/btc_usd/ticker',function(r){
	//console.log(' \033[33mresult: \033[0m'+r);
	r.on('data',function(d){
		process.stdout.write(' \033[34mstream:\033[0m '+d);
	});
}).on('error',function(r){
	console.log(' \033[320mError: '+e);
});


*/

/*


var https = require('https');
var q = https.request({
	hostname: 'btc-e.com',
	port: 443,
	path: '/api/2/btc_usd/ticker',
	method: 'GET' 
},function(r){
	r.on('data',function(d){
		console.log(d);
	});
});

*/

/*

// curl -k https://localhost:8000/
var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('./brauns-key.pem'),
  cert: fs.readFileSync('./brauns-cert.pem')
};

https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(8000);

*/


/*
var http = require('http');
http.get('http://btc-e.com/api/2/btc_usd/ticker',function(r){
	console.log(r);
}).on('error',function(e){throw e;});
*/
/*
module.exports = function () {
	var http = require('http');
	return {
		go: go
	};
	//setInterval(handleTimeLoop,Math.abs(Math.random() * 10000));
	//https://btc-e.com/api/2/btc_usd/ticker
	var btce = {
		endpoints: {
			btc2Usd: 'https://btc-e.com/api/2/btc_usd/ticker'
		}
	};
	function parse(p) {
		console.log(p);
	}
	function defaultEndpointHandler(r) {
		parse(r);
	}
	function defaultErrorHandler(e) {
		throw e;
	}
	function handleTimeLoop() {
		http
			.get(btce.endpoints.default_,defaultEndpointHandler)
			.on('error',defaultErrorHandler)
			;
	}
	function enterTimeLoop() {
		defaultEndpointHandler();
	}
	function go() {
		enterTimeLoop();
	}
}

	Usage:

		var btce = require('btc-e');
		btce.go();


*/