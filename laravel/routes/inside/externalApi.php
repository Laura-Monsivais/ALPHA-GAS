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
    Route::post('getExternalApis', 'Inside\ExternalAPIController@getExternalApis')->name('inside.getExternalApis');
    Route::post('exportExternalApis', 'Inside\ExternalAPIController@exportExternalApis')->name('inside.exportExternalApis');
    Route::post('insertExternalApi', 'Inside\ExternalAPIController@insertExternalApi')->name('inside.insertExternalApi');
    Route::post('updateExternalApi', 'Inside\ExternalAPIController@updateExternalApi')->name('inside.updateExternalApi');
    Route::post('rechargeCellphone', 'Inside\ExternalAPIController@rechargeCellphone')->name('inside.rechargeCellphone');
    Route::post('payCFE', 'Inside\ExternalAPIController@payCFE')->name('inside.payCFE');
    Route::post('payTELMEX', 'Inside\ExternalAPIController@payTELMEX')->name('inside.payTELMEX');
});
    
