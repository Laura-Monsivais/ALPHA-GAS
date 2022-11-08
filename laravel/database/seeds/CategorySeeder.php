<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::insert([
            //'id' => 1,
            'name' => 'MADERA',
            'business_id' => 1//MEJOR MADERA, MADERERÍA
        ]);
        Category::insert([
            //'id' => 2,
            'name' => 'GASOLINA',
            'business_id' => 2//PARADOR HACIENDA NUEVA, GASOLINERÍA
        ]);
        Category::insert([
            //'id' => 3,
            'name' => 'ACEITE',
            'business_id' => 2//PARADOR HACIENDA NUEVA, GASOLINERÍA
        ]);
        Category::insert([
            //'id' => 4,
            'name' => 'GAS DONACIÓN',
            'business_id' => 3//GAS LUX, GASERA
        ]);
        Category::insert([
            //'id' => 5,
            'name' => 'GAS AUTOCONSUMO',
            'business_id' => 3//GAS LUX, GASERA
        ]);
        Category::insert([
            //'id' => 6,
            'name' => 'GAS DONACIÓN',
            'business_id' => 4//AUREGAS, GASERA
        ]);
        Category::insert([
            //'id' => 7,
            'name' => 'GAS AUTOCONSUMO',
            'business_id' => 4//AUREGAS, GASERA
        ]);
        Category::insert([
            //'id' => 8,
            'name' => 'GAS DONACIÓN',
            'business_id' => 5//GOTGAS, GASERA
        ]);
        Category::insert([
            //'id' => 9,
            'name' => 'GAS AUTOCONSUMO',
            'business_id' => 5//GOTGAS, GASERA
        ]);
        Category::insert([
            //'id' => 10,
            'name' => 'GAS DONACIÓN',
            'business_id' => 6//ALFA GAS, GASERA
        ]);
        Category::insert([
            //'id' => 11,
            'name' => 'GAS AUTOCONSUMO',
            'business_id' => 6//ALFA GAS, GASERA
        ]);
        Category::insert([
            //'id' => 12,
            'name' => 'GAS DONACIÓN',
            'business_id' => 7//GAS DEL CAÑON, GASERA
        ]);
        Category::insert([
            //'id' => 13,
            'name' => 'GAS AUTOCONSUMO',
            'business_id' => 7//GAS DEL CAÑON, GASERA
        ]);
        if (App::environment('local')) {
            try {
                factory(Category::class, 20)->create();
            } catch (\Exception $catchError) {
            }
        }
    }
}
