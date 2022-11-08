<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use App\Models\Donation;

class DonationSeeder extends Seeder
{
    /**
     * The name of the seeder corresponding model.
     *
     * @var string
     */
    protected $model = Donation::class;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (App::environment('local')) {
            try {
                factory(Donation::class, 30)->create();            
            } catch (\Exception $catchError) {
            }
        }
    }
}
