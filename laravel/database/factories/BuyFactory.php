<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Buy;
use App\Models\Session;
use Faker\Generator as Faker;

$factory->define(Buy::class, function (Faker $faker) {
    $total = 123.45;
    return [
        'total' => $total,
        'client_id' => Session::all()->random()->id,
        'seller_id' => Session::all()->random()->id,
    ];
});
