<?php

namespace App\Traits;

use App\Models\RouteType;
use Illuminate\Support\Facades\Auth;


trait RouteTypeTrait 
{
    
    public function queryGetRouteTypeTrait()
    {
        $all = RouteType::select('route_types.id', 
            'route_types.name',
            'route_types.update_meter',
            'route_types.created_at', 
            'route_types.updated_at')
        ->whereNull('route_types.deleted_at');    
        $all = $all->orderBy('route_types.updated_at', 'DESC');
        return $all;
    }
}