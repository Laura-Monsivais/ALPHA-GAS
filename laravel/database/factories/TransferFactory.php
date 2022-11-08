<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Inventory;
use App\Models\Product;
use App\Models\Subsidiary;
use App\Models\Transfer;
use Faker\Generator as Faker;

$factory->define(Transfer::class, function (Faker $faker) {
    $inventory = Inventory::all()->random();
    if($inventory->inventory_theoretical >= 1){
        $product = Product::where('id', $inventory->product_id)->first();
        return [
            'key' => "Output",
            'name' => $faker->name,
            'inventory_id' => $inventory->id,
            'quantity' => 1,
            'destination_id' => Subsidiary::inRandomOrder()
                ->pluck('id')
                ->first()
        ];
    }
});
