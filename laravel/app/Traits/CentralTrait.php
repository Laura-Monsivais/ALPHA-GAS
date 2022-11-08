<?php

namespace App\Traits;

use App\Models\Central;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

trait CentralTrait 
{
    
    public function queryGetCentralsTrait()
    {        
        $all = Central::select(
            'centrals.id',
            'centrals.name',
            'centrals.street',
            'centrals.exterior',
            'centrals.interior',
            'centrals.postal_code',
            'centrals.neighborhood',
            'centrals.city',
            'centrals.municipality',
            'centrals.state',
            'centrals.country',
            'centrals.references',
            'centrals.business_id',
            'businesses.name AS businessName',
            'centrals.created_at',
            'centrals.updated_at')
        ->whereNull('centrals.deleted_at')
        ->join('businesses', 'businesses.id', 'centrals.business_id')
        ->join('enterprises', 'enterprises.id', 'businesses.enterprise_id');
        switch (Auth::user()->session->rol->key) {
            case "Super":
            break;
            case "Call_Center":
                $all = $all->where('centrals.id', Auth::user()->session->Central_id);
            break;
            case "Director":
                //$all = $all->where('enterprises.id', Auth::user()->session->Central->business->enterprise->id);
            break;
            case "Manager":
                $all = $all->where('centrals.id', Auth::user()->session->Central_id);
            break;
            case "Seller":
                $all = $all->where('centrals.id', 0);
            break;
            case "Client":
                $all = $all->where('centrals.id', 0);
            break;
            default:
                $all = $all->where('centrals.id', 0);
            break;
        }    
        $all = $all->orderBy('centrals.updated_at', 'DESC');
        return $all;
    }
}