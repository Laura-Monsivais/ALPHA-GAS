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

Route::get('getUserAvatar/{avatar?}','Inside\UserController@getUserAvatar')->name('inside.getUserAvatar');
Route::get('getUserCover/{cover?}','Inside\UserController@getUserCover')->name('inside.getUserCover');
Route::group(['middleware' => ['auth:api']], function () { 
    Route::post('getUsers', 'Inside\UserController@getUsers')->name('inside.getUsers');
    Route::post('insertUser', 'Inside\UserController@insertUser')->name('inside.insertUser');
    Route::post('exportUsers', 'Inside\UserController@exportUsers')->name('inside.exportUsers');
    Route::post('updateUser', 'Inside\UserController@updateUser')->name('inside.updateUser');
    Route::post('updateUserSessionId', 'Inside\UserController@updateUserSessionId')->name('inside.updateUserSessionId');
    Route::post('downloadUserAvatar', 'Inside\UserController@downloadUserAvatar')->name('inside.downloadUserAvatar');
    Route::post('downloadUserCover', 'Inside\UserController@downloadUserCover')->name('inside.downloadUserCover');
});
    
