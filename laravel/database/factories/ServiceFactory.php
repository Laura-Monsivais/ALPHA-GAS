<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Enterprise;
use App\Models\Service;
use Faker\Generator as Faker;

$enterprise = Enterprise::inRandomOrder()->first();
$factory->define(Service::class, function (Faker $faker) use ($enterprise) {
    if(isset($enterprise)){
        $enterpriseId = $enterprise->id;
    } else {
        $enterpriseId = 1;
    }
    
    return [
        'name' => $faker->name,
        'cost' => mt_rand(0,999999),
        'price' => mt_rand(0,999999),
        'enterprise_id' => $enterpriseId,
    ];
});
