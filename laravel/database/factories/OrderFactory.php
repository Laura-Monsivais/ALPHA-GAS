<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Order;
use App\Models\Address;
use App\Models\Session;
use Faker\Generator as Faker;

$factory->define(Order::class, function (Faker $faker) {
    $total = 123.45;
    $address = Address::all()->random();
    return [
        'code' => $faker->name,
        'total' => $total,
        'address_id' => $address->id,
        'client_id' => $address->client_id
    ];
});
