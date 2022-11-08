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
    Route::post('getBuys', 'Inside\BuyController@getBuys')->name('inside.getBuys');
    Route::post('insertBuy', 'Inside\BuyController@insertBuy')->name('inside.insertBuy');
    Route::post('updateBuy', 'Inside\BuyController@updateBuy')->name('inside.updateBuy');
    Route::post('exportBuys', 'Inside\BuyController@exportBuys')->name('inside.exportBuys');
});
