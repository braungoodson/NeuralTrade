var key = '';
var secret = '';
var b = require('btc-e');
//b(PORT,BUYIN,CASH,BTC,CHIP,FUTURE);
b(process.pid,10000,0,0,0,.01005,10000,key,secret);