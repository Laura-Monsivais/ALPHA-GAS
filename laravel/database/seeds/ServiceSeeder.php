<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    /**
     * The name of the seeder corresponding model.
     *
     * @var string
     */
    protected $model = Service::class;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (App::environment('local')) {
            factory(Service::class, 30)->create();
        }
    }
}
