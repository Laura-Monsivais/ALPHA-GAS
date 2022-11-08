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
    Route::post('getInventories', 'Inside\InventoryController@getInventories')->name('inside.getInventories');
    Route::post('updateInventory', 'Inside\InventoryController@updateInventory')->name('inside.updateInventory');
    Route::post('exportInventories', 'Inside\InventoryController@exportInventories')->name('inside.exportInventories');
});
    
