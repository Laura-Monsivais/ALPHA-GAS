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
    Route::post('getTransfers', 'Inside\TransferController@getTransfers')->name('inside.getTransfers');    
    Route::post('exportTransfers', 'Inside\TransferController@exportTransfers')->name('inside.exportTransfers');
    Route::post('insertTransfer', 'Inside\TransferController@insertTransfer')->name('inside.insertTransfer');
    Route::post('updateTransfer', 'Inside\TransferController@updateTransfer')->name('inside.updateTransfer');
    Route::post('acceptTransfer', 'Inside\TransferController@acceptTransfer')->name('inside.acceptTransfer');
});
    
