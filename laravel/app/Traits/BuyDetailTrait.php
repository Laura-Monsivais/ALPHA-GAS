<?php

namespace App\Traits;

use App\Models\BuyDetail;
use Illuminate\Support\Facades\DB;

trait BuyDetailTrait
{
    
    public function queryGetBuyDetailsTrait()
    {
        $all = BuyDetail::select('buy_details.id',
            'buy_details.buy_id',
            'buy_details.product_id',
            'buy_details.service_id',
            DB::raw('IFNULL(products.name, services.name) AS name'),
            'products.image',
            'products.description',
            'products.content',
            'products.unit',
            'buy_details.cost',            
            'businesses.name AS businessName',
            'inventories.id AS inventoryId',
            'inventories.inventory_theoretical AS inventoryTheoretical',
            'buy_details.quantity',
            'buy_details.density',
            'buy_details.conversion',
            'buy_details.amount',
            'buy_details.created_at',
            'buy_details.updated_at')
        ->whereNull('buy_details.deleted_at')
        ->join('buys', 'buys.id', 'buy_details.buy_id')
        ->leftJoin('products', 'products.id', 'buy_details.product_id')
        ->leftJoin('services', 'services.id', 'buy_details.service_id')
        ->leftJoin('businesses', 'businesses.id', 'products.business_id')
        ->leftJoin('inventories', 'inventories.id', 'buy_details.inventory_id');       
        $all = $all->orderBy('buy_details.updated_at', 'DESC');
        return $all;
    }
}
