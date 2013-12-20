<?php

function btce_query($method, array $req = array()) {
        // API settings
        $key = 'BB8TIFKG-MW2GOGLE-1G60QKNL-DTKWTISA-TR71OI8C'; // your API-key
        $secret = '465cec0c07565b19829184809de5bb291c791cd00fc63a03c2f96ead01ec4fab'; // your Secret-key

        $req['method'] = $method;
        $mt = explode(' ', microtime());
        $req['nonce'] = $mt[1];

        // generate the POST data string
        $post_data = http_build_query($req, '', '&');

        $sign = hash_hmac('sha512', $post_data, $secret);

        // generate the extra headers
        $headers = array(
                        'Sign: '.$sign,
                        'Key: '.$key,
        );

        // our curl handle (initialize if required)
        static $ch = null;

        if (is_null($ch)) {
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; BTCE PHP client; '.php_uname('s').'; PHP/'.phpversion().')');
        }
        
        curl_setopt($ch, CURLOPT_URL, 'https://btc-e.com/tapi/');
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

        // run the query
        $res = curl_exec($ch);
        if ($res === false) throw new Exception('Could not get reply: '.curl_error($ch));
        $dec = json_decode($res, true);
        if (!$dec) throw new Exception('Invalid data received, please make sure connection is working and requested API exists');
        return $dec;
}
 
$result = btce_query('getInfo');
//$result = btce_query('Trade', array('pair' => 'btc_usd', 'type' => 'buy', 'amount' => 1, 'rate' => 10)); //buy 1 BTC @ 10 USD
 
var_dump($result);
?>