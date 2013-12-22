var KEY = 'BB8TIFKG-MW2GOGLE-1G60QKNL-DTKWTISA-TR71OI8C';
var SECRET = '465cec0c07565b19829184809de5bb291c791cd00fc63a03c2f96ead01ec4fab';

var tradeApi = require('btc-e-trade-api');

tradeApi.init(KEY,SECRET);

tradeApi.getInfo(console.log);
tradeApi.getFee(console.log);