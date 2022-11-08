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
    Route::post('getDonations', 'Inside\DonationController@getDonations')->name('inside.getDonations');    
    Route::post('exportDonations', 'Inside\DonationController@exportDonations')->name('inside.exportDonations');
    Route::post('insertDonation', 'Inside\DonationController@insertDonation')->name('inside.insertDonation');
    Route::post('updateDonation', 'Inside\DonationController@updateDonation')->name('inside.updateDonation');
});
    
