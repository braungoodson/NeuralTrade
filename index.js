var key = 'BB8TIFKG-MW2GOGLE-1G60QKNL-DTKWTISA-TR71OI8C';
var secret = '465cec0c07565b19829184809de5bb291c791cd00fc63a03c2f96ead01ec4fab';
var b = require('btc-e');
//b(PORT,BUYIN,CASH,BTC,CHIP,FUTURE);
b(process.pid,13000,0,0,0,.01,10000,key,secret);