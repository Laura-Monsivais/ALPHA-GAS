<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Address;
use App\Models\Session;
use Faker\Generator as Faker;

$factory->define(Address::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'street' => $faker->name,
        'exterior' => $faker->name,
        'postal_code' => mt_rand(11111,99999),
        'neighborhood' => $faker->name,
        'city' => $faker->city,
        'municipality' => $faker->city,
        'state' => $faker->state,
        'country' => $faker->country,
        'client_id' => Session::all()->random()->id
    ];
});
