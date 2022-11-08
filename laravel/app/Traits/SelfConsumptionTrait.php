<?php

namespace App\Traits;

use App\Models\SelfconsumptionModel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

trait SelfconsumptionTrait 
{
    
    public function queryGetSelfconsumptionsTrait()
    {
        $all = SelfconsumptionModel::select('selfconsumptions.id',
            'enterprises.id AS enterpriseId',
            'enterprises.name AS enterpriseName',
            'businesses.id AS businessId',
            'businesses.name AS businessName',
            'subsidiaries.id AS subsidiaryId',
            'subsidiaries.name AS subsidiaryName',                        
            'categories.id AS categoryId',
            'categories.name AS categoryName',
            'products.id AS productId',
            'products.name AS productName',
            'products.unit AS productUnit',
            'selfconsumptions.inventory_id',
            'inventories.inventory_theoretical AS inventoryTheoretical',
            'selfconsumptions.quantity',
            'selfconsumptions.cost',
            'selfconsumptions.total',
            'selfconsumptions.route_id AS route_id',
            'routes.name AS routeName',
            'selfconsumptions.start',
            'selfconsumptions.end',       
            'selfconsumptions.initial_mileage',
            'selfconsumptions.end_mileage',
            'selfconsumptions.performance',
            'selfconsumptions.created_at',
            'selfconsumptions.updated_at')
        ->whereNull('selfconsumptions.deleted_at')
        ->join('inventories', 'inventories.id', 'selfconsumptions.inventory_id')
        ->join('subsidiaries', 'subsidiaries.id', 'inventories.subsidiary_id')
        ->join('businesses', 'businesses.id', 'subsidiaries.business_id')
        ->join('enterprises', 'enterprises.id', 'businesses.enterprise_id')
        ->leftJoin('routes', 'routes.id', 'selfconsumptions.route_id')
        ->join('products', 'products.id', 'inventories.product_id')
        ->join('categories', 'categories.id', 'products.category_id');
        switch (Auth::user()->session->rol->key) {
            case "Super":
            break;
            case "Director":
                $all = $all->where('enterprises.id', Auth::user()->session->subsidiary->business->enterprise->id);
            break;
            case "Manager":
                $all = $all->where('subsidiaries.id', Auth::user()->session->subsidiary_id);
            break;
            case "Call_Center":
                $all = $all->where('subsidiaries.id', Auth::user()->session->subsidiary_id);
            break;
            case "Seller":
                $all = $all->where('subsidiaries.id', Auth::user()->session->subsidiary_id);
            break;
            case "Client":
                $all = $all->where('subsidiaries.id', Auth::user()->session->subsidiary_id);
            break;
            default:
                $all = $all->where('selfconsumptions.id', 0);
            break;
        }
        $all = $all->orderBy('selfconsumptions.updated_at', 'DESC');
        return $all;
    }
}