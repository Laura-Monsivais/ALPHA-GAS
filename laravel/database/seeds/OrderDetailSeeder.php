<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use App\Models\OrderDetail;

class OrderDetailSeeder extends Seeder
{
    /**
     * The name of the seeder corresponding model.
     *
     * @var string
     */
    protected $model = OrderDetail::class;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (App::environment('local')) {
            try {
                factory(OrderDetail::class, 20)->create();            
            } catch (\Exception $catchError) {
            }
        }
    }
}
