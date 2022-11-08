<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use App\Models\BuyDetail;

class BuyDetailSeeder extends Seeder
{
    /**
     * The name of the seeder corresponding model.
     *
     * @var string
     */
    protected $model = BuyDetail::class;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (App::environment('local')) {
            try {
                factory(BuyDetail::class, 10)->create();            
            } catch (\Exception $catchError) {
            }
        }
    }
}
