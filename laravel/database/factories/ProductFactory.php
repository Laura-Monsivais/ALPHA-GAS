<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Business;
use App\Models\Product;
use Carbon\Carbon;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {    
    return [
        'name' => $faker->name,
        'content' => mt_rand(0,50),
        'unit' => $faker->name,
        'cost' => mt_rand(0,999999),
        'price' => mt_rand(0,999999),
        'business_id' => Business::inRandomOrder()
        ->pluck('id')
        ->first()
    ];
});
