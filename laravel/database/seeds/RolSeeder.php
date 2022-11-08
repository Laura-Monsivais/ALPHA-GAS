<?php

use Illuminate\Database\Seeder;
use App\Models\Rol;

class RolSeeder extends Seeder
{
    /**
     * The name of the seeder corresponding model.
     *
     * @var string
     */
    protected $model = Rol::class;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Rol::insert([
            //'id' => 1,
            'key' => "Super", 
            'name' => "Super"
        ]);
        Rol::insert([
            //'id' => 2,
            'key' => "Director", 
            'name' => "Director"
        ]);
        Rol::insert([
            //'id' => 3,
            'key' => "Manager", 
            'name' => "Gerente"
        ]);
        Rol::insert([
            //'id' => 4,
            'key' => "Call_Center", 
            'name' => "Centro de atención"
        ]);
        Rol::insert([
            //'id' => 5,
            'key' => "Seller", 
            'name' => "Vendedor"
        ]);
        Rol::insert([
            //'id' => 6,
            'key' => "Client", 
            'name' => "Cliente"
        ]);
    }
}