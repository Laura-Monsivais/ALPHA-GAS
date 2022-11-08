<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Donation;
use App\Models\Inventory;
use App\Models\Product;
use Carbon\Carbon;
use Faker\Generator as Faker;

$factory->define(Donation::class, function (Faker $faker) {
    $inventory = Inventory::all()->random();
    if($inventory->inventory_theoretical >= 1){
        $product = Product::where('id', $inventory->product_id)->first();
        return [
            'name' => $faker->name,
            'realized_at' => Carbon::now(),
            'inventory_id' => $inventory->id,
            'quantity' => 1,
            'cost' => $product->cost,
            'total' => $product->cost
        ];
    }
});
