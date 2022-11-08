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
Route::get('getServices', 'Inside\ServiceController@getServices')->name('inside.getServices');
Route::group(['middleware' => ['auth:api']], function () { 
    Route::post('getServices', 'Inside\ServiceController@getServices')->name('inside.getServices');
    Route::post('exportServices', 'Inside\ServiceController@exportServices')->name('inside.exportServices');
    Route::post('insertService', 'Inside\ServiceController@insertService')->name('inside.insertService');
    Route::post('updateService', 'Inside\ServiceController@updateService')->name('inside.updateService');
});
    
