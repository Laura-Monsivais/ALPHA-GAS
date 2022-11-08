<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * The name of the seeder corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $passwordDefault = (App::environment('local')) ? '123456' : 'Emurci@2021';
        User::insert([
            //'id' => 1,
            'name' => 'Salvador',
            'lastname1' => 'Mejia',
            'lastname2' => 'Mora',
            'cellphone' => '1234567890',
            'password' => Hash::make($passwordDefault),
            'remember_token' => NULL
        ]);
        User::insert([
            //'id' => 2,
            'name' => 'Guillermo',
            'lastname1' => 'Medina',
            'cellphone' => '1234567891',
            'password' => Hash::make($passwordDefault),
            'remember_token' => NULL
        ]);
        User::insert([
            //'id' => 3,
            'name' => 'Emmanuel',
            'lastname1' => 'Nieves',
            'cellphone' => '1234567892',
            'password' => Hash::make($passwordDefault),
            'remember_token' => NULL
        ]);
        User::insert([
            //'id' => 4,
            'name' => 'Cesar',
            'lastname1' => 'Barrientos',
            'cellphone' => '1234567893',
            'password' => Hash::make($passwordDefault),
            'remember_token' => NULL
        ]);
        User::insert([
            //'id' => 5,
            'name' => 'Brenda',
            'lastname1' => 'Monsivais',
            'cellphone' => '1234567894',
            'password' => Hash::make($passwordDefault),
            'remember_token' => NULL
        ]);
        User::insert([
            //'id' => 6,
            'name' => 'Yesenia',
            'lastname1' => 'Flores',
            'cellphone' => '1234567895',
            'password' => Hash::make($passwordDefault),
            'remember_token' => NULL
        ]);
        User::insert([
            //'id' => 7,
            'name' => 'Usuario',
            'lastname1' => 'Emurcia',
            'cellphone' => '1234567896',
            'password' => Hash::make($passwordDefault),
            'remember_token' => NULL
        ]);
        if (App::environment('local')) {
            factory(User::class, 25)->create();
        }
    }
}
