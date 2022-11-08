<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Buy;
use Faker\Generator as Faker;

$factory->define(Buy::class, function (Faker $faker) {
    $cost = 123.45;
    return [
        'buy_id' => 1,
        'service_id' => 1,
        'quantity' => 1,
        'cost' => $cost,
        'amount' => $cost
    ];
});
