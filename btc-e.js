var http = require('http');
http.get('http://btc-e.com/api/2/btc_usd/ticker',function(r){
	console.log(r);
}).on('error',function(e){throw e;});

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