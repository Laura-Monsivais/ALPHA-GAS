<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Business;
use App\Models\Enterprise;
use App\Models\Promotion;
use Carbon\Carbon;
use Faker\Generator as Faker;

$enterprise = Enterprise::with(['businesses'])->inRandomOrder()->first();
$factory->define(Promotion::class, function (Faker $faker) use ($enterprise) {
    if(isset($enterprise)){
        $enterpriseId = $enterprise->id;
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
        if(isset($business)){
            if(isset($business->subsidiaries)){
                if(count($business->subsidiaries) > 0){
                    $subsidiary = $business->subsidiaries->random();
                    $subsidiaryId = $subsidiary->id;
                } else {
                    $subsidiary = null;
                    $subsidiaryId = null;
                }
            } else {
                $subsidiary = null;
                $subsidiaryId = null;
            }
        } else {
            $subsidiary = null;
            $subsidiaryId = null;
        }
    } else {
        $enterpriseId = 1;
        $businessId = null;
        $subsidiaryId = null;
    }
    
    return [
        'name' => $faker->name,
        'price' => mt_rand(0,999999),
        'cost' => mt_rand(0,999999),
        'expires_at' => Carbon::now()->addDays(3),
        'enterprise_id' => $enterpriseId,
        'business_id' => $businessId,
        'subsidiary_id' => $subsidiaryId
    ];
});
