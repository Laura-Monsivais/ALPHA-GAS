<?php

namespace App\Traits;

use App\Models\Inventory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

trait InventoryTrait
{

    public function queryGetInventoryTrait()
    {
        $all = Inventory::select(
            'inventories.id',
            'enterprises.id AS enterpriseId',
            'enterprises.name AS enterpriseName',
            'businesses.id AS businessId',
            'businesses.name AS businessName',
            'inventories.subsidiary_id',
            DB::raw('IFNULL(inventories.subsidiary_id,0) AS subsidiary_id'),
            'subsidiaries.name AS subsidiaryName',
            DB::raw('IF(subsidiaries.is_central = 1, "Central", "Sucursal") AS type'),
            DB::raw('IFNULL(inventories.product_id,0) AS product_id'),
            'products.name AS productName',
            'products.unit AS productUnit',
            'products.cost AS productCost',
            'inventories.inventory_theoretical',
            'inventories.inventory_real',
            'inventories.inventory_difference',
            'inventories.buys',
            'inventories.sales',
            'inventories.selfconsumptions',
            'inventories.donations',
            'inventories.earnings',
            'inventories.created_at',
            'inventories.updated_at'
        )
            ->whereNull('inventories.deleted_at')
            ->join('subsidiaries', 'subsidiaries.id', 'inventories.subsidiary_id')
            ->join('businesses', 'businesses.id', 'subsidiaries.business_id')
            ->join('enterprises', 'enterprises.id', 'businesses.enterprise_id')
            ->join('products', 'products.id', 'inventories.product_id')
            ->join('categories', 'categories.id', 'products.category_id');
        switch (Auth::user()->session->rol->key) {
            case "Super":
                break;
            case "Director":
                //$all = $all->where('inventories.enterprise_id', Auth::user()->session->subsidiary->business->enterprise->id);
                break;
            case "Manager":
                $all = $all->where('inventories.business_id', Auth::user()->session->subsidiary->business->id);
                break;
            case "Call_Center":
                $all = $all->where('inventories.business_id', Auth::user()->session->subsidiary->business->id);
                break;
            case "Seller":
                $all = $all->where('inventories.business_id', Auth::user()->session->subsidiary->business->id);
                break;
            case "Client":
                $all = $all->where('inventories.business_id', Auth::user()->session->subsidiary->business->id);
                break;
            default:
                $all = $all->where('inventories.id', 0);
                break;
        }
        $all = $all->orderBy('inventories.updated_at', 'DESC');
        return $all;
    }
}
