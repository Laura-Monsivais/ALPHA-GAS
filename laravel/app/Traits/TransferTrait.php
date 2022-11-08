<?php

namespace App\Traits;

use App\Models\Transfer;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

trait TransferTrait
{

    public function queryGetTransfersTrait()
    {
        $all = Transfer::select(
            'transfers.id',
            'transfers.key',
            DB::raw('IF(transfers.key = "Output", "Salida", "Entrada") AS changeKey'),
            'transfers.name',
            'enterprises.id AS enterpriseId',
            'enterprises.name AS enterpriseName',
            'businesses.id AS businessId',
            'businesses.name AS businessName',
            'origins.id AS origenId',
            'origins.name AS originName',
            'categories.id AS categoryId',
            'categories.name AS categoryName',
            'products.id AS productId',
            'products.name AS productName',
            'products.unit AS productUnit',
            'transfers.inventory_id',
            'inventories.inventory_theoretical AS inventoryTheoretical',
            'transfers.quantity',
            'transfers.destination_id',
            'destinations.name AS destinationName',
            'transfers.status',
            'transfers.created_at',
            'transfers.updated_at'
        )
            ->whereNull('transfers.deleted_at')
            ->join('inventories', 'inventories.id', 'transfers.inventory_id')
            ->join('subsidiaries AS origins', 'origins.id', 'inventories.subsidiary_id')
            ->join('businesses', 'businesses.id', 'origins.business_id')
            ->join('enterprises', 'enterprises.id', 'businesses.enterprise_id')
            ->join('products', 'products.id', 'inventories.product_id')
            ->join('categories', 'categories.id', 'products.category_id')
            ->join('subsidiaries AS destinations', 'destinations.id', 'transfers.destination_id');
        switch (Auth::user()->session->rol->key) {
            case "Super":
                break;
            case "Director":
                $all = $all->where('enterprises.id', Auth::user()->session->subsidiary->business->enterprise->id);
                break;
            case "Manager":
                $all = $all->where('origins.id', Auth::user()->session->subsidiary->id);
                break;
            case "Call_Center":
                $all = $all->where('transfers.id', 0);
                break;
            case "Seller":
                $all = $all->where('transfers.id', 0);
                break;
            case "Client":
                $all = $all->where('transfers.id', 0);
                break;
            default:
                $all = $all->where('transfers.id', 0);
                break;
        }
        $all = $all->orderBy('transfers.updated_at', 'DESC');
        return $all;
    }
}
