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

Route::get('getProductImage/{image?}','Inside\ProductController@getProductImage')->name('inside.getProductImage');
Route::group(['middleware' => ['auth:api']], function () { 
    Route::post('getProducts', 'Inside\ProductController@getProducts')->name('inside.getProducts');
    Route::post('exportProducts', 'Inside\ProductController@exportProducts')->name('inside.exportProducts');
    Route::post('insertProduct', 'Inside\ProductController@insertProduct')->name('inside.insertProduct');
    Route::post('updateProduct', 'Inside\ProductController@updateProduct')->name('inside.updateProduct');
    Route::post('downloadProductImage', 'Inside\ProductController@downloadProductImage')->name('inside.downloadProductImage');
});    
