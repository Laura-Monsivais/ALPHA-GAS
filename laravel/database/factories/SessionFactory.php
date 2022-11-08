<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Rol;
use App\Models\Session;
use App\Models\Subsidiary;
use App\Models\User;
use Carbon\Carbon;
use Faker\Generator as Faker;

$factory->define(Session::class, function (Faker $faker) {
    return [
        'user_id' => User::all()->random()->id,
        'rol_id' => Rol::all()->random()->id,
        'subsidiary_id' => Subsidiary::all()->random()->id
    ];
});
