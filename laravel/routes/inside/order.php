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
    Route::post('getOrders', 'Inside\OrderController@getOrders')->name('inside.getOrders');
    Route::post('insertOrder', 'Inside\OrderController@insertOrder')->name('inside.insertOrder');
    Route::post('exportOrders', 'Inside\OrderController@exportOrders')->name('inside.exportOrders');
    Route::post('updateOrder', 'Inside\OrderController@updateOrder')->name('inside.updateOrder');
});
    
