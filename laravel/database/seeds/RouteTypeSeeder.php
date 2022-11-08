<?php

use Illuminate\Database\Seeder;
use App\Models\RouteType;

class RouteTypeSeeder extends Seeder
{
    /**
     * The name of the seeder corresponding model.
     *
     * @var string
     */
    protected $model = RouteType::class;
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        RouteType::insert([
            'name' => 'Utilitaria',
            'update_meter' => 0
        ]);
        RouteType::insert([
            'name' => 'Pipa',
            'update_meter' => 1
        ]);
        RouteType::insert([
            'name' => 'Cilindrera',
            'update_meter' => 0
        ]);
        RouteType::insert([
            'name' => 'Planta cilindro',
            'update_meter' => 0
        ]);
        RouteType::insert([
            'name' => 'Planta litros',
            'update_meter' => 0
        ]);
        RouteType::insert([
            'name' => 'Estación de carburación litros',
            'update_meter' => 1
        ]);
        RouteType::insert([
            'name' => 'Tanque magna',
            'update_meter' => 0
        ]);
        RouteType::insert([
            'name' => 'Tanque premium',
            'update_meter' => 0
        ]);
        RouteType::insert([
            'name' => 'Tanque deisel',
            'update_meter' => 0
        ]);
    }
}
