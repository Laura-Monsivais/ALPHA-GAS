<?php

namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class AuthentificationController extends Controller
{
    public function getAuth(Request $request)
    {
        $user = Auth::user();
        $session = $user->session;
        $enterprise = $user->session->subsidiary->business->enterprise;
        $business = $user->session->subsidiary->business;
        $attention = $user->session->subsidiary->business->attention;
        $subsidiary = $user->session->subsidiary;
        $rol = $user->session->rol;
        return response()->json(['user' => $user, 'session' => $session, 'enterprise' => $enterprise, 'business' => $business, 'attention' => $attention, 'subsidiary' => $subsidiary, 'rol' => $rol], 200);
    }

    public function generateRandomString($length = 10)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
}
