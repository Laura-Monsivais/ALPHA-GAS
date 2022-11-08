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

Route::group(['middleware' => ['auth:api']], function () { 
    Route::post('getSessions', 'Inside\SessionController@getSessions')->name('inside.getSessions');
    Route::post('exportSessions', 'Inside\SessionController@exportSessions')->name('inside.exportSessions'); 
});
    
