<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use App\Models\Session;

class SessionSeeder extends Seeder
{
    /**
     * The name of the seeder corresponding model.
     *
     * @var string
     */
    protected $model = Session::class;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Session::insert([
            //'id' => 1,
            'user_id' => 1,
            'rol_id' => 1,//Super
            'subsidiary_id' => 1
        ]);
        Session::insert([
            //'id' => 2,
            'user_id' => 2,
            'rol_id' => 2,//Director
            'subsidiary_id' => 2
        ]);
        Session::insert([
            //'id' => 3,
            'user_id' => 2,
            'rol_id' => 2,//Director
            'subsidiary_id' => 6
        ]);
        Session::insert([
            //'id' => 4,
            'user_id' => 3,
            'rol_id' => 3,//Gerente
            'subsidiary_id' => 2
        ]);
        Session::insert([
            //'id' => 5,
            'user_id' => 3,
            'rol_id' => 3,//Gerente
            'subsidiary_id' => 6
        ]);
        Session::insert([
            //'id' => 6,
            'user_id' => 4,
            'rol_id' => 4,//Call_Center
            'subsidiary_id' => 2
        ]);
        Session::insert([
            //'id' => 7,
            'user_id' => 4,
            'rol_id' => 4,//Call_Center
            'subsidiary_id' => 6
        ]);
        Session::insert([
            //'id' => 8,
            'user_id' => 5,
            'rol_id' => 5,//Seller
            'subsidiary_id' => 2
        ]);
        Session::insert([
            //'id' => 9,
            'user_id' => 5,
            'rol_id' => 5,//Seller
            'subsidiary_id' => 6
        ]);       
        Session::insert([
            //'id' => 10,
            'user_id' => 6,
            'rol_id' => 6,//Client
            'subsidiary_id' => 2
        ]);
        Session::insert([
            //'id' => 11,
            'user_id' => 6,
            'rol_id' => 6,//Client
            'subsidiary_id' => 6
        ]);  
        Session::insert([
            //'id' => 12,
            'user_id' => 7,
            'rol_id' => 1,//Super
            'subsidiary_id' => 1
        ]);
        Session::insert([
            //'id' => 13,
            'user_id' => 7,
            'rol_id' => 2,//Director
            'subsidiary_id' => 2
        ]);
        Session::insert([
            //'id' => 14,
            'user_id' => 7,
            'rol_id' => 2,//Director
            'subsidiary_id' => 6
        ]);
        Session::insert([
            //'id' => 15,
            'user_id' => 7,
            'rol_id' => 3,//Gerente
            'subsidiary_id' => 2
        ]);
        Session::insert([
            //'id' => 16,
            'user_id' => 7,
            'rol_id' => 3,//Gerente
            'subsidiary_id' => 6
        ]);
        Session::insert([
            //'id' => 17,
            'user_id' => 7,
            'rol_id' => 4,//Call_Center
            'subsidiary_id' => 2
        ]);
        Session::insert([
            //'id' => 18,
            'user_id' => 7,
            'rol_id' => 4,//Call_Center
            'subsidiary_id' => 6
        ]);
        Session::insert([
            //'id' => 19,
            'user_id' => 7,
            'rol_id' => 5,//Seller
            'subsidiary_id' => 2
        ]);
        Session::insert([
            //'id' => 20,
            'user_id' => 7,
            'rol_id' => 5,//Seller
            'subsidiary_id' => 6
        ]);
        Session::insert([
            //'id' => 21,
            'user_id' => 7,
            'rol_id' => 6,//Client
            'subsidiary_id' => 2
        ]);
        Session::insert([
            //'id' => 22,
            'user_id' => 7,
            'rol_id' => 6,//Client
            'subsidiary_id' => 6
        ]);
        if (App::environment('local')) {
            try {
                factory(Session::class, 21)->create();
            } catch (\Exception $catchError) {
            }
        }
    }
}
