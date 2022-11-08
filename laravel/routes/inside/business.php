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
    Route::post('getBusinesses', 'Inside\BusinessController@getBusinesses')->name('inside.getBusinesses');    
    Route::post('exportBusinesses', 'Inside\BusinessController@exportBusinesses')->name('inside.exportBusinesses');
    Route::post('insertBusiness', 'Inside\BusinessController@insertBusiness')->name('inside.insertBusiness');
    Route::post('updateBusiness', 'Inside\BusinessController@updateBusiness')->name('inside.updateBusiness');
});
    
