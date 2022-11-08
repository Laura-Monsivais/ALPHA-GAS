<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Route;
use App\Models\RouteType;
use App\Models\Session;
use Faker\Generator as Faker;

$factory->define(Route::class, function (Faker $faker) {    
    return [
        'name' => $faker->name,
        'route_type_id' => RouteType::all()->random()->id,
        'maximum_capacity' => mt_rand(0,999999),
        'minimum_capacity' => mt_rand(0,999999),
        'seller_id' => Session::select('sessions.id')
            ->join('roles', 'roles.id', 'sessions.rol_id')
            ->where('roles.key', 'Seller')
            ->inRandomOrder()
            ->pluck('id')
            ->first(),
        'cellphone' => rand(1111111111,9999999999)
    ];
});
