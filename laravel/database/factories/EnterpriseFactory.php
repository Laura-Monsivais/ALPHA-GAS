<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Enterprise;
use Faker\Generator as Faker;

$factory->define(Enterprise::class, function (Faker $faker) {
    return [
        'name' => $faker->unique()->company
    ];
});
