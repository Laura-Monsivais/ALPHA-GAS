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
    Route::post('inside/getEnterpriseLogo','Inside\EnterpriseController@getEnterpriseLogo')->name('inside.getEnterpriseLogo');
    Route::post('getEnterpriseOverlay','Inside\EnterpriseController@getEnterpriseOverlay')->name('inside.getEnterpriseOverlay');
    Route::post('inside/getEnterprises', 'Inside\EnterpriseController@getEnterprises')->name('inside.getEnterprises');
    Route::post('insertEnterprise', 'Inside\EnterpriseController@insertEnterprise')->name('inside.insertEnterprise');//Super
    Route::post('updateEnterprise', 'Inside\EnterpriseController@updateEnterprise')->name('inside.updateEnterprise');
    Route::post('downloadEnterpriseLogo', 'Inside\EnterpriseController@downloadEnterpriseLogo')->name('inside.downloadEnterpriseLogo');
    Route::post('downloadEnterpriseOverlay', 'Inside\EnterpriseController@downloadEnterpriseOverlay')->name('inside.downloadEnterpriseOverlay');
});