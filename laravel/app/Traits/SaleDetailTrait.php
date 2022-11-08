<?php

namespace App\Traits;

use App\Models\SaleDetail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

trait SaleDetailTrait
{
    /**
     * The name of the trait corresponding model.
     *
     * @var string
     */

    public function queryGetSaleDetailsTrait()
    {
        $all = SaleDetail::select('sale_details.id',
            'sale_details.sale_id',
            'sale_details.promotion_id',
            'sale_details.product_id',
            'sale_details.service_id',
            DB::raw('IFNULL(promotions.name, IFNULL(products.name, services.name)) AS name'),
            'products.image',
            'products.description',
            'products.content',
            'products.unit',
            'promotions.expires_at',
            'sale_details.price',
            'inventories.id AS inventoryId',
            'inventories.inventory_theoretical AS inventoryTheoretical',
            'sale_details.quantity',
            'sale_details.amount',
            'sale_details.created_at',
            'sale_details.updated_at')
        ->whereNull('sale_details.deleted_at')
        ->join('sales', 'sales.id', 'sale_details.sale_id')
        ->leftJoin('promotions', 'promotions.id', 'sale_details.promotion_id')
        ->leftJoin('products', 'products.id', 'sale_details.product_id')
        ->leftJoin('services', 'services.id', 'sale_details.service_id')
        ->leftJoin('inventories', 'inventories.id', 'sale_details.inventory_id');
        return $all;
    }
}
