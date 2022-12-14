<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('login', 'Outside\AuthentificationController@login')->name('outside.login');
Route::group(['middleware' => ['auth:api']], function () { 
    Route::post('getAuth', 'Inside\AuthentificationController@getAuth')->name('inside.getAuth');
});
Route::post('logout', 'Outside\AuthentificationController@logout')->name('inside.logout');
