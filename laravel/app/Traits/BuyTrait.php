<?php

namespace App\Traits;

use App\Models\Buy;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

trait BuyTrait
{
    
    public function queryGetBuysTrait()
    {
        $all = Buy::select('buys.id',
            'buys.name',
            'buys.provenance',
            'buys.transport',
            'buys.embarked_at',
            'enterprises.id AS enterpriseId',
            'enterprises.name AS enterpriseName',
            'businesses.id AS businessId',
            'businesses.name AS businessName',
            'buys.expected_destination_id',
            'expectedDestinations.name AS expectedDestinationName',
            'buys.destination_id',
            'destinations.name AS destinationName',
            'buys.downloaded_at',
            'buys.total',
            'buys.created_at',
            'buys.updated_at')
        ->whereNull('buys.deleted_at')
        ->join('subsidiaries AS expectedDestinations', 'expectedDestinations.id', 'buys.expected_destination_id')
        ->join('businesses', 'businesses.id', 'expectedDestinations.business_id')
        ->join('enterprises', 'enterprises.id', 'businesses.enterprise_id')
        ->leftJoin('subsidiaries AS destinations', 'destinations.id', 'buys.destination_id');
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
                $all = $all->where('buys.id', 0);
            break;
            case "Client":
                $all = $all->where('buys.id', 0);
            break;
            default:
                $all = $all->where('buys.id', 0);
            break;
        }        
        $all = $all->orderBy('buys.updated_at', 'DESC');
        return $all;
    }
}
