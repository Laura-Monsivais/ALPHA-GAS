<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Sale;
use App\Models\Order;
use App\Models\Session;
use Faker\Generator as Faker;

$factory->define(Sale::class, function (Faker $faker) {
    $total = 123.45;
    return [
        'total' => $total,
        'client_id' => Session::all()->random()->id,
        'seller_id' => Session::all()->random()->id,
        'order_id' => Order::all()->random()->id,
    ];
});
