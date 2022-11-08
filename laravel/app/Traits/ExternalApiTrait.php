<?php

namespace App\Traits;

use App\Models\ExternalApi;
use Illuminate\Support\Facades\Auth;


trait ExternalApiTrait 
{
    
    public function queryGetExternalApisTrait()
    {
        $all = ExternalApi::select('external_apis.id', 
            'external_apis.function',
            'external_apis.url',
            'external_apis.method',
            'external_apis.token',
            'external_apis.enterprise_id',
            'enterprises.name AS enterpriseName',
            'external_apis.created_at', 
            'external_apis.updated_at')
        ->whereNull('external_apis.deleted_at')        
        ->join('enterprises', 'enterprises.id', 'external_apis.enterprise_id');
        switch(Auth::user()->session->rol->key){
            case "Super":
            break;
            case "Director":
                $all = $all->where('external_apis.enterprise_id', Auth::user()->session->subsidiary->business->enterprise->id);
            break;
            case "Manager":
                $all = $all->where('external_apis.enterprise_id', Auth::user()->session->subsidiary->business->enterprise->id);
            break;
            case "Call_Center":
                $all = $all->where('external_apis.enterprise_id', Auth::user()->session->subsidiary->business->enterprise->id);
            break;
            case "Seller":
                $all = $all->where('external_apis.id', 0);
            break;
            case "Client":
                $all = $all->where('external_apis.id', 0);
            break;
            default:
                $all = $all->where('external_apis.id', 0);
            break;
        }
        $all = $all->orderBy('external_apis.updated_at', 'DESC');
        return $all;
    }
}