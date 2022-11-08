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
Route::get('getSale', 'Inside\SaleController@getSale')->name('inside.getSale');

Route::group(['middleware' => ['auth:api']], function () { 
    Route::post('getSales', 'Inside\SaleController@getSales')->name('inside.getSales');
    Route::post('insertSale', 'Inside\SaleController@insertSale')->name('inside.insertSale');
    Route::post('exportSales', 'Inside\SaleController@exportSales')->name('inside.exportSales');
    Route::post('updateSale', 'Inside\SaleController@updateSale')->name('inside.updateSale');
});
    