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
    Route::post('getPromotions', 'Inside\PromotionController@getPromotions')->name('inside.getPromotions');
    Route::post('exportPromotions', 'Inside\PromotionController@exportPromotions')->name('inside.exportPromotions');
    Route::post('insertPromotion', 'Inside\PromotionController@insertPromotion')->name('inside.insertPromotion');
    Route::post('updatePromotion', 'Inside\PromotionController@updatePromotion')->name('inside.updatePromotion');
});
