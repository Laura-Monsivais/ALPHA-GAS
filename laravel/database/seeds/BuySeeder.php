<?php

use Illuminate\Database\Seeder;
use App\Models\Buy;

class BuySeeder extends Seeder
{
    /**
     * The name of the seeder corresponding model.
     *
     * @var string
     */
    protected $model = Buy::class;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        try {
            factory(Buy::class, 5)->create();            
        } catch (\Exception $catchError) {
        }
    }
}
