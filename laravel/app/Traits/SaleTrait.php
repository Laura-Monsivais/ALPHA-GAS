<?php

namespace App\Traits;

use App\Models\Sale;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

trait SaleTrait
{
    /**
     * The name of the trait corresponding model.
     *
     * @var string
     */

    public function queryGetSalesTrait($orderBy = true)
    {
        $all = Sale::select('sales.id',
            'enterprises.id AS enterpriseId',
            'enterprises.name AS enterpriseName',
            'businesses.id AS businessId',
            'businesses.name AS businessName',
            'subsidiaries.id AS subsidiaryId',
            'subsidiaries.name AS subsidiaryName',
            'sales.seller_id',
            DB::raw('CONCAT(sellers.name, " ", sellers.lastname1, " ", IFNULL(sellers.lastname2, "")) AS sellerNameComplete'),
            DB::raw('IFNULL(sales.client_id,0) AS client_id'),
            DB::raw('CONCAT(clients.name, " ", clients.lastname1, " ", IFNULL(clients.lastname2, "")) AS clientNameComplete'),            
            'clients.cellphone AS clientCellphone',
            DB::raw('IFNULL(sales.order_id,0) AS order_id'),
            'sales.total',
            'sales.created_at',
            'sales.updated_at')
        ->whereNull('sales.deleted_at')
        ->join('sessions AS session_sellers', 'session_sellers.id', 'sales.seller_id')
        ->join('users AS sellers', 'sellers.id', 'session_sellers.user_id')
        ->join('subsidiaries', 'subsidiaries.id', 'session_sellers.subsidiary_id')
        ->join('businesses', 'businesses.id', 'subsidiaries.business_id')
        ->join('enterprises', 'enterprises.id', 'businesses.enterprise_id')
        ->leftJoin('sessions AS session_clients', 'session_clients.id', 'sales.client_id')
        ->leftJoin('users AS clients', 'clients.id', 'session_clients.user_id');
        switch (Auth::user()->session->rol->key) {
            case "Super":
            break;
            case "Director":
                $all = $all->where('enterprises.id', Auth::user()->session->subsidiary->business->enterprise->id);
            break;
            case "Manager":
                $all = $all->where('subsidiaries.id', Auth::user()->session->subsidiary->id);
            break;
            case "Call_Center":
                $all = $all->where('subsidiaries.id', Auth::user()->session->subsidiary->id);
            break;
            case "Seller":
                $all = $all->where('subsidiaries.id', Auth::user()->session->subsidiary->id);
            break;
            case "Client":
                $all = $all->where('session_clients.id', Auth::user()->session->id);
            break;
            default:
                $all = $all->where('sales.id', 0);
            break;
        }       
        if($orderBy) {
            $all = $all->orderBy('sales.updated_at', 'DESC');
        }
        return $all;
    }
}
