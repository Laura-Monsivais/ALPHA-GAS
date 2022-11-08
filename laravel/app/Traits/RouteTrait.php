<?php

namespace App\Traits;

use App\Models\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


trait RouteTrait 
{
    
    public function queryGetRoutesTrait()
    {
        $all = Route::select('routes.id', 
            'routes.name',
            'routes.route_type_id',
            'route_types.name AS routeTypeName',
            'routes.maximum_capacity',
            'routes.minimum_capacity',
            'enterprises.id AS enterpriseId',
            'enterprises.name AS enterpriseName',
            'businesses.id AS businessId',
            'businesses.name AS businessName',
            'subsidiaries.id AS subsidiaryId',
            'subsidiaries.name AS subsidiaryName',
            'routes.seller_id',
            DB::raw('CONCAT(users.name, " ", users.lastname1, " ", IFNULL(users.lastname2, "")) AS sellerNameComplete'),
            'routes.cellphone',
            'routes.created_at', 
            'routes.updated_at')
        ->whereNull('routes.deleted_at')        
        ->join('route_types', 'route_types.id', 'routes.route_type_id')
        ->join('sessions', 'sessions.id', 'routes.seller_id')
        ->join('users', 'users.id', 'sessions.user_id')
        ->join('subsidiaries', 'subsidiaries.id', 'sessions.subsidiary_id')
        ->join('businesses', 'businesses.id', 'subsidiaries.business_id')
        ->join('enterprises', 'enterprises.id', 'businesses.enterprise_id');
        switch(Auth::user()->session->rol->key){
            case "Super":
            break;
            case "Call_Center":
                $all = $all->where('routes.enterprise_id', Auth::user()->session->subsidiary->business->enterprise->id);
            break;
            case "Director":
                $all = $all->where('routes.enterprise_id', Auth::user()->session->subsidiary->business->enterprise->id);
            break;
            case "Manager":
                $all = $all->where('routes.enterprise_id', Auth::user()->session->subsidiary->business->enterprise->id);
            break;
            case "Seller":
                $all = $all->where('routes.id', 0);
            break;
            case "Client":
                $all = $all->where('routes.id', 0);
            break;
            default:
                $all = $all->where('routes.id', 0);
            break;
        }
        $all = $all->orderBy('routes.updated_at', 'DESC');
        return $all;
    }
}