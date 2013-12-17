var request = require('request');


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