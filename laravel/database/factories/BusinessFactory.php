<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Attention;
use App\Models\Business;
use App\Models\Enterprise;
use Faker\Generator as Faker;

$factory->define(Business::class, function (Faker $faker) {
    return [
        'name' => $faker->company,
        'enterprise_id' => Enterprise::all()->random()->id,
        'attention_id' => Attention::all()->random()->id
    ];
});
