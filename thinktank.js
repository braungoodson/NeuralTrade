#!/usr/bin/env node

var api = require('btc-e-trade-api')();

var key = 'BB8TIFKG-MW2GOGLE-1G60QKNL-DTKWTISA-TR71OI8C';
var secret = '465cec0c07565b19829184809de5bb291c791cd00fc63a03c2f96ead01ec4fab';

api.init(key,secret);

//console.log(api.key(),api.secret());

api.test(console.log,'--btc .01 --cash 45.39');
api.getInfo(getInfoHandler);

function getInfoHandler(info) {
	info = JSON.parse(info);
	console.log(info['return'].funds.btc);
}