<?php

require_once('./node_modules/btc-e-trade-api/btce-api.php');

$BTCeAPI = new BTCeAPI('BB8TIFKG-MW2GOGLE-1G60QKNL-DTKWTISA-TR71OI8C','465cec0c07565b19829184809de5bb291c791cd00fc63a03c2f96ead01ec4fab');

print_r($BTCeAPI->getPairFee('btc_usd'));