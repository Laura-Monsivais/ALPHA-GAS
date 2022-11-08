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
Route::get('getSubsidiaryLogo/{logo?}','Inside\SubsidiaryController@getSubsidiaryLogo')->name('inside.getSubsidiaryLogo');
Route::get('getSubsidiaryOverlay/{overlay?}','Inside\SubsidiaryController@getSubsidiaryOverlay')->name('inside.getSubsidiaryOverlay');
Route::group(['middleware' => ['auth:api']], function () { 
    Route::post('getSubsidiaries', 'Inside\SubsidiaryController@getSubsidiaries')->name('inside.getSubsidiaries');
    Route::post('insertSubsidiary', 'Inside\SubsidiaryController@insertSubsidiary')->name('inside.insertSubsidiary');
    Route::post('exportSubsidiaries', 'Inside\SubsidiaryController@exportSubsidiaries')->name('inside.exportSubsidiaries');
    Route::post('updateSubsidiary', 'Inside\SubsidiaryController@updateSubsidiary')->name('inside.updateSubsidiary');
    Route::post('downloadSubsidiaryLogo', 'Inside\SubsidiaryController@downloadSubsidiaryLogo')->name('inside.downloadSubsidiaryLogo');
    Route::post('downloadSubsidiaryOverlay', 'Inside\SubsidiaryController@downloadSubsidiaryOverlay')->name('inside.downloadSubsidiaryOverlay');
});
    