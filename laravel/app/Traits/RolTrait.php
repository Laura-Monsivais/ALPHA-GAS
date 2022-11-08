<?php

namespace App\Traits;

use App\Models\Rol;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


trait RolTrait 
{
    
    public function queryGetRolesTrait()
    {
        $all = Rol::select('roles.id', 
            'roles.key',
            'roles.name',
            'roles.created_at', 
            'roles.updated_at')
        ->whereNull('roles.deleted_at');
        switch (Auth::user()->session->rol->key) {
            case "Super":
            break;
            case "Director":
                $all = $all->whereIn('roles.key', [ "Manager", "Call_Center", "Seller", "Client"]);
            break;
            case "Manager":
                $all = $all->whereIn('roles.key', ["Call_Center", "Seller", "Client"]);
            break;
            case "Call_Center":
                $all = $all->whereIn('roles.key', ["Client"]);
            break;
            case "Seller":
                $all = $all->whereIn('roles.key', ["Client"]);
            break;
            case "Client":
                $all = $all->whereIn('roles.key', ["Client"]);
            break;
            default:
                $all = $all->where('roles.id', 0);
            break;
        }
        $all = $all->orderBy('roles.updated_at', 'DESC');
        return $all;
    }
}