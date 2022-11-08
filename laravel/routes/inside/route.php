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
    Route::post('getRoutes', 'Inside\RouteController@getRoutes')->name('inside.getRoutes');
    Route::post('exportRoutes', 'Inside\RouteController@exportRoutes')->name('inside.exportRoutes');
    Route::post('insertRoute', 'Inside\RouteController@insertRoute')->name('inside.insertRoute');
    Route::post('updateRoute', 'Inside\RouteController@updateRoute')->name('inside.updateRoute');
});    
