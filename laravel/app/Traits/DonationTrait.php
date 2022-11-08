<?php

namespace App\Traits;

use App\Models\Donation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

trait DonationTrait 
{
    
    public function queryGetDonationsTrait()
    {
        $all = Donation::select('donations.id', 
            'donations.name',
            'donations.realized_at',
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
            'donations.inventory_id',
            'inventories.inventory_theoretical AS inventoryTheoretical',
            'donations.quantity',
            'donations.cost',
            'donations.total',
            'donations.created_at', 
            'donations.updated_at')
        ->whereNull('donations.deleted_at')
        ->join('inventories', 'inventories.id', 'donations.inventory_id')
        ->join('subsidiaries', 'subsidiaries.id', 'inventories.subsidiary_id')
        ->join('businesses', 'businesses.id', 'subsidiaries.business_id')
        ->join('enterprises', 'enterprises.id', 'businesses.enterprise_id')
        ->join('products', 'products.id', 'inventories.product_id')
        ->join('categories', 'categories.id', 'products.category_id');  
        $all = $all->orderBy('donations.updated_at', 'DESC');
        return $all;
    }
}