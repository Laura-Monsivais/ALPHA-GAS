
<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Business;
use App\Models\Subsidiary;
use Faker\Generator as Faker;

$factory->define(Subsidiary::class, function (Faker $faker) {
    return [
        'name' => $faker->address,
        'street' => $faker->name,
        'exterior' => $faker->name,
        'postal_code' => mt_rand(11111,99999),
        'neighborhood' => $faker->name,
        'city' => $faker->city,
        'municipality' => $faker->city,
        'state' => $faker->state,
        'country' => $faker->country,
        'business_id' => Business::all()->random()->id
    ];
});
