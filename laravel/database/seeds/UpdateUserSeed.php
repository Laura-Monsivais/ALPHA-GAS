<?php

use Illuminate\Database\Seeder;
use App\Models\Session;
use App\Models\User;

class UpdateUserSeed extends Seeder
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
        $users = User::all();
        foreach ($users as $user) {
            $firstSession = Session::where('user_id', $user->id)->first();
            if(isset($firstSession)){
                $user->session_id = $firstSession->id;
                $user->save();
            }
        }
    }
}
