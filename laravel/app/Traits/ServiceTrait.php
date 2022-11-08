<?php

namespace App\Traits;

use App\Models\Service;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

trait ServiceTrait 
{
    
    public function queryGetServiceTrait()
    {
        $all = Service::select('services.id',
            'services.name',
            'services.description',
            'services.cost',
            'services.price',
            'services.enterprise_id',
            'enterprises.name AS enterpriseName',
            'services.created_at',
            'services.updated_at',
            DB::raw('(1) AS quantity'),
            'services.cost AS amountCost',
            'services.price AS amountPrice')
        ->whereNull('services.deleted_at')
        ->join('enterprises', 'enterprises.id', 'services.enterprise_id');
        switch(Auth::user()->session->rol->key){
            case "Super":
            break;
            case "Director":
                $all = $all->where('services.enterprise_id', Auth::user()->session->subsidiary->business->enterprise->id);
            break;
            case "Manager":
                $all = $all->where('services.enterprise_id', Auth::user()->session->subsidiary->business->enterprise->id);
            break;
            case "Call_Center":
                $all = $all->where('services.enterprise_id', Auth::user()->session->subsidiary->business->enterprise->id);
            break;
            case "Seller":
                $all = $all->where('services.enterprise_id', Auth::user()->session->subsidiary->business->enterprise->id);
            break;
            case "Client":
                $all = $all->where('services.id', 0);
            break;
            default:
                $all = $all->where('services.id', 0);
            break;
        }
        $all = $all->orderBy('services.updated_at', 'DESC');
        return $all;
    }
}