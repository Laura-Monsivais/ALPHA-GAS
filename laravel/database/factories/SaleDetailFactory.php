<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Sale;
use Faker\Generator as Faker;

$factory->define(Sale::class, function (Faker $faker) {
    $price = 123.45;
    return [
        'sale_id' => 1,
        'service_id' => 1,
        'quantity' => 1,
        'price' => $price,
        'amount' => $price
    ];
});
