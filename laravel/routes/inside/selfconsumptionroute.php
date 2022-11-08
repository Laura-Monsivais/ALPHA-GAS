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
    Route::post('getSelfconsumptions', 'Inside\SelfConsumptionController@getSelfconsumptions')->name('inside.getSelfconsumptions');
    Route::post('insertSelfconsumption', 'Inside\SelfConsumptionController@insertSelfconsumption')->name('inside.insertSelfconsumption');
    Route::post('updateSelfconsumption', 'Inside\SelfConsumptionController@updateSelfconsumption')->name('inside.updateSelfconsumption');
    Route::post('exportSelfconsumption', 'Inside\SelfConsumptionController@exportSelfconsumption')->name('inside.exportSelfconsumption');
});
