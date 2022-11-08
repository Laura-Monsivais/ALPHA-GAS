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
    Route::post('getCategories', 'Inside\CategoryController@getCategories')->name('inside.getCategories');
    Route::post('exportCategories', 'Inside\CategoryController@exportCategories')->name('inside.exportCategories');
    Route::post('insertCategory', 'Inside\CategoryController@insertCategory')->name('inside.insertCategory');
    Route::post('updateCategory', 'Inside\CategoryController@updateCategory')->name('inside.updateCategory');
});    
