<?php

namespace App\Providers;

use App\Models\BuyDetail;
use App\Models\Donation;
use App\Models\Inventory;
use App\Models\Product;
use App\Models\SaleDetail;
use App\Models\SelfconsumptionModel;
use App\Models\Subsidiary;
use App\Models\Transfer;
use App\Observers\BuyDetailObserver;
use App\Observers\DonationObserver;
use App\Observers\InventoryObserver;
use App\Observers\ProductObserver;
use App\Observers\SaleDetailObserver;
use App\Observers\SelfconsumptionObserver;
use App\Observers\SubsidiaryObserver;
use App\Observers\TransferObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void 
     */
    public function boot()
    {
        BuyDetail::observe(BuyDetailObserver::class);
        Donation::observe(DonationObserver::class);
        Inventory::observe(InventoryObserver::class);
        Product::observe(ProductObserver::class);
        SaleDetail::observe(SaleDetailObserver::class);
        SelfconsumptionModel::observe(SelfconsumptionObserver::class);
        Subsidiary::observe(SubsidiaryObserver::class);
        Transfer::observe(TransferObserver::class);
    }
}
