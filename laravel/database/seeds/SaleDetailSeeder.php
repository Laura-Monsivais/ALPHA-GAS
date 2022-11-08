<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use App\Models\SaleDetail;

class SaleDetailSeeder extends Seeder
{
    /**
     * The name of the seeder corresponding model.
     *
     * @var string
     */
    protected $model = SaleDetail::class;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (App::environment('local')) {
            try {
                factory(SaleDetail::class, 10)->create();            
            } catch (\Exception $catchError) {
            }
        }
    }
}
