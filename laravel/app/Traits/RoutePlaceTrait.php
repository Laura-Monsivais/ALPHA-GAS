<?php

namespace App\Traits;

use App\Models\RoutePlace;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


trait RoutePlaceTrait 
{
    
    public function queryGetRoutePlacesTrait()
    {
        $all = RoutePlace::select('route_places.id',
            'route_places.route_id',
            'route_places.country',
            'route_places.state',
            'route_places.municipality',
            'route_places.city',
            'route_places.postal_code',
            'route_places.neighborhood',
            'route_places.created_at', 
            'route_places.updated_at')
        ->whereNull('route_places.deleted_at')        
        ->join('routes', 'routes.id', 'route_places.route_id');
        $all = $all->orderBy('route_places.updated_at', 'DESC');
        return $all;
    }
}