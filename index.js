var key = '4UD2ZTH0-JETMWFNR-XGMANWA6-WYAHXJX6-FIMHM5RD';
var secret = 'ecb2f7377ab67d75f80474839e304707070c34b07f4d8d23fc84961c500904cd';
var b = require('btc-e');
//b(PORT,BUYIN,CASH,BTC,CHIP,FUTURE);
b(process.pid,10000,0,0,0,.01005,10000,key,secret);