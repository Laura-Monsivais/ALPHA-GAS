<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use App\Models\Business;

class BusinessSeeder extends Seeder
{
    /**
     * The name of the seeder corresponding model.
     *
     * @var string
     */
    protected $model = Business::class;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Business::insert([
            'name' => 'Maderería',
            'enterprise_id' => 1,
            'attention_id' => 2
        ]);
        Business::insert([
            'name' => 'Gasolinería',
            'enterprise_id' => 2,
            'attention_id' => 2
        ]);
        Business::insert([
            'name' => 'Gasera',
            'enterprise_id' => 3,
            'attention_id' => 1
        ]);
        Business::insert([
            'name' => 'Gasera',
            'enterprise_id' => 4,
            'attention_id' => 1
        ]);
        Business::insert([
            'name' => 'Gasera',
            'enterprise_id' => 5,
            'attention_id' => 1
        ]);
        Business::insert([
            'name' => 'Gasera',
            'enterprise_id' => 6,
            'attention_id' => 1
        ]);
        Business::insert([
            'name' => 'Gasera',
            'enterprise_id' => 7,
            'attention_id' => 1
        ]);
        if (App::environment('local')) {
            factory(Business::class, 4)->create();   
        }     
    }
}
