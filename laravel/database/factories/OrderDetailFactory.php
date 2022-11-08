<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Order;
use App\Models\Address;
use App\Models\Session;
use Faker\Generator as Faker;

$factory->define(Order::class, function (Faker $faker) {
    $price = 123.45;
    return [
        'order_id' => 1,
        'promotion_id' => 1,
        'quantity' => 1,
        'price' => $price,
        'amount' => $price
    ];
});
