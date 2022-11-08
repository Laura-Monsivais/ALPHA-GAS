<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use App\Models\Order;

class OrderSeeder extends Seeder
{
    /**
     * The name of the seeder corresponding model.
     *
     * @var string
     */
    protected $model = Order::class;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (App::environment('local')) {
            try {
                factory(Order::class, 10)->create();            
            } catch (\Exception $catchError) {
            }
        }
    }
}
