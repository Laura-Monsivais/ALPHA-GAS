<?php

namespace App\Traits;

use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

trait OrderTrait
{

    public function queryGetOrdersTrait()
    {
        $all = Order::select('orders.id',
            'enterprises.id AS enterpriseId',
            'enterprises.name AS enterpriseName',
            'businesses.id AS businessId',
            'businesses.name AS businessName',
            'subsidiaries.id AS subsidiaryId',
            'subsidiaries.name AS subsidiaryName',
            'orders.client_id',
            DB::raw('CONCAT(users.name, " ", users.lastname1, " ", IFNULL(users.lastname2, "")) AS clientNameComplete'),
            'users.cellphone AS clientCellphone',
            'orders.observation',
            'orders.address_id',
            'addresses.name AS addressName',  
            DB::raw('CONCAT(addresses.name, " ", 
                addresses.street, " ", 
                addresses.exterior, " ", 
                IFNULL(addresses.interior, ""), " ", 
                addresses.postal_code, " ", 
                addresses.neighborhood, " ", 
                addresses.city, " ", 
                addresses.municipality, " ", 
                addresses.state, " ", 
                addresses.country, " ", 
                IFNULL(addresses.references, "")) AS addressConcat'),
            'orders.deliver_at',
            'orders.total',
            'orders.status',
            'orders.code',
            'orders.created_at',
            'orders.updated_at')
        ->whereNull('orders.deleted_at')
        ->join('addresses', 'addresses.id', 'orders.address_id')
        ->join('sessions', 'sessions.id', 'orders.client_id')
        ->join('users', 'users.id', 'sessions.user_id')
        ->join('subsidiaries', 'subsidiaries.id', 'sessions.subsidiary_id')
        ->join('businesses', 'businesses.id', 'subsidiaries.business_id')
        ->join('enterprises', 'enterprises.id', 'businesses.enterprise_id');
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
                $all = $all->where('subsidiaries.id', Auth::user()->session->subsidiary->id);
            break;
            default:
                $all = $all->where('orders.id', 0);
            break;
        }
        $all = $all->orderBy('orders.updated_at', 'DESC');
        return $all;
    }
}
