<?php

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
Route::get('getRolManual/{manual?}', 'Inside\RolController@getRolManual')->name('inside.getRolManual');
Route::group(['middleware' => ['auth:api']], function () { 
    Route::post('getRoles', 'Inside\RolController@getRoles')->name('inside.getRoles');
    Route::post('downloadRolManual', 'Inside\RolController@downloadRolManual')->name('inside.downloadRolManual');
});
    