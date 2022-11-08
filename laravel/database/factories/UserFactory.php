<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\User;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'lastname1' => $faker->lastName,
        'cellphone' => rand(1111111111,9999999999),
        'password' => Hash::make("Emurci@2021"),
        'remember_token' => NULL
    ];
});
