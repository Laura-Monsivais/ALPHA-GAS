<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use App\Models\Enterprise;

class EnterpriseSeeder extends Seeder
{
    /**
     * The name of the seeder corresponding model.
     *
     * @var string
     */
    protected $model = Enterprise::class;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Enterprise::insert([
            //'id' => 1,
            'name' => 'MEJOR MADERA'
        ]);
        Enterprise::insert([
            //'id' => 2,
            'name' => 'PARADOR HACIENDA NUEVA',
            'logo' => '2.jpg',
            'overlay' => '2.jpeg'
        ]);
        Enterprise::insert([
            //'id' => 3,
            'name' => 'GAS LUX',
            'logo' => '3.jpg',
            'overlay' => '3.jpg'
        ]);
        Enterprise::insert([
            //'id' => 4,
            'name' => 'AUREGAS',
            'logo' => '4.jpg',
            'overlay' => '4.jpg'
        ]);
        Enterprise::insert([
            //'id' => 5,
            'name' => 'GOTGAS'
        ]);
        Enterprise::insert([
            //'id' => 6,
            'name' => 'ALFA GAS',
            'logo' => '6.jpg',
            'overlay' => '6.jpg'
        ]);
        Enterprise::insert([
            //'id' => 7,
            'name' => 'GAS DEL CAÑON',
            'logo' => '7.jpg',
            'overlay' => '7.jpg'
        ]);
        if (App::environment('local')) {
            factory(Enterprise::class, 2)->create();
        }
    }
}
