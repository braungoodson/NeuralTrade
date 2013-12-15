NeuralNet
=========

Usage
=========

<pre>
$ git clone http://github.com/braungoodson/NeuralNet
$ git checkout release-0.0.3-beta
$ node ./index.js
 t 1 $ 10 BTC 0 Rate 894.155 Prediction undefined Buyout 10
 t 2 $ 10 BTC 0 Rate 893.0799999999999 Prediction sell Buyout 10
 ...
</pre>
<pre>
$ curl http://localhost:10000/predictions
{
  "t": 157,
  "cash": 1.9462000000000206,
  "btc": 0.01,
  "rate": 905.5,
  "prediction": "buy",
  "buyout": 11.02620000000002,
  "profit": 1.0262000000000207
}
</pre>

links
=========

* https://npmjs.org/package/bashcoin
* http://nodejs.org/api/child_process.html#child_process_child_process
