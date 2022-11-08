<?php

namespace App\Traits;

use App\Models\OrderDetail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

trait OrderDetailTrait
{

    public function queryGetOrderDetailsTrait()
    {
        $all = OrderDetail::select('order_details.id', 
            'order_details.order_id', 
            'orders.code AS orderCode',
            'order_details.promotion_id',
            'order_details.product_id',
            DB::raw('IFNULL(promotions.name, products.name) AS name'),
            'products.image',
            'products.description',
            'products.content',
            'products.unit',            
            'promotions.expires_at',                        
            'order_details.price',
            'inventories.id AS inventoryId',            
            'inventories.inventory_theoretical AS inventoryTheoretical',
            'order_details.quantity',
            'order_details.amount',
            'order_details.observation',
            'order_details.created_at', 
            'order_details.updated_at')
        ->whereNull('order_details.deleted_at')
        ->join('orders', 'orders.id', 'order_details.order_id')
        ->leftJoin('promotions', 'promotions.id', 'order_details.promotion_id')
        ->leftJoin('products', 'products.id', 'order_details.product_id')
        ->leftJoin('inventories', 'inventories.id', 'order_details.inventory_id');
        $all = $all->orderBy('orders.updated_at', 'DESC');
        return $all;
    }
}
