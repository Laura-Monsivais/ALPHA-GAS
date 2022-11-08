<?php

namespace App\Http\Controllers\Outside;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Session;
use App\Models\User;
use Carbon\Carbon;

class AuthentificationController extends Controller
{
    public function login(Request $request)
    {
        if(isset($request->remember_token)){
            $remember_token = true;
        } else {
            User::where('cellphone', $request->cellphone)
            ->update([
                'remember_token' => NULL
            ]); 
            $remember_token = false;
        }
        if (Auth::attempt(['cellphone' => $request->cellphone, 'password' => $request->password], $remember_token)) {
            $token = auth()->user()->createToken('EMURCIA')->accessToken;
            $user = Auth::user();
            $session = $user->session;
            $enterprise = $user->session->subsidiary->business->enterprise;
            $business = $user->session->subsidiary->business;
            $attention = $user->session->subsidiary->business->attention;
            $subsidiary = $user->session->subsidiary;
            $rol = $user->session->rol;
            return response()->json(['token' => $token, 'user' => $user, 'session' => $session, 'enterprise' => $enterprise, 'business' => $business, 'attention' => $attention, 'subsidiary' => $subsidiary, 'rol' => $rol], 200);
        } else {
            return response()->json(['error' => 'UnAuthorised'], 401);
        }
    }

    public function logout(Request $request)
    {
        try {
            auth()->user()->tokens->each(function ($token, $key) {
                $token->delete();
            });
        } catch (\Exception $catchError) {
        }
        return response()->json(200);
    }
}
