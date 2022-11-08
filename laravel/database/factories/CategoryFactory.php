<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Business;
use App\Models\Enterprise;
use App\Models\Category;
use Carbon\Carbon;
use Faker\Generator as Faker;

$enterprise = Enterprise::with(['businesses'])->inRandomOrder()->first();
$factory->define(Category::class, function (Faker $faker) use ($enterprise) {
    if(isset($enterprise)){
        if(isset($enterprise->businesses)){
            if(count($enterprise->businesses) > 0){
                $business = $enterprise->businesses->random();
                $businessId = $business->id;
            } else {
                $business = null;
                $businessId = null;
            }
        } else {
            $business = null;
            $businessId = null;
        }
    } else {
        $businessId = null;
    }
    
    return [
        'name' => $faker->name,
        'business_id' => $businessId
    ];
});
