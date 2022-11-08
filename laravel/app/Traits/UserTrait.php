<?php

namespace App\Traits;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

trait UserTrait
{
    
    public function queryGetUsersTrait()
    {
        $all = User::select(DB::raw('DISTINCT(users.id) AS id'),
            'users.name',
            'users.lastname1',
            'users.lastname2',
            'users.cellphone',
            'users.password',
            'users.avatar',
            'users.cover',
            'users.session_id',
            'users.created_at',
            'users.updated_at')
        ->whereNull('users.deleted_at')
        ->join('sessions', 'sessions.user_id', 'users.id')
        ->join('roles', 'roles.id', 'sessions.rol_id')
        ->join('subsidiaries', 'subsidiaries.id', 'sessions.subsidiary_id')
        ->join('businesses', 'businesses.id', 'subsidiaries.business_id')
        ->join('enterprises', 'enterprises.id', 'businesses.enterprise_id');
        switch (Auth::user()->session->rol->key) {
            case "Super":
                $all = $all->whereIn('roles.key', ['Director',  'Manager', 'Call_Center', 'Seller', 'Client']);
            break;
            case "Director":
                $all = $all->where('enterprises.id', Auth::user()->session->subsidiary->business->enterprise->id)
                ->whereIn('roles.key', ['Call_Center', 'Manager', 'Seller', 'Client']);
            break;
            case "Manager":
                $all = $all->where('enterprises.id', Auth::user()->session->subsidiary->business->enterprise->id)
                ->where('subsidiaries.id', Auth::user()->session->subsidiary->id)
                ->whereIn('roles.key', ['Seller', 'Client']);
            break;
            case "Call_Center":
                $all = $all->where('enterprises.id', Auth::user()->session->subsidiary->business->enterprise->id)
                ->where('subsidiaries.id', Auth::user()->session->subsidiary->id)
                ->whereIn('roles.key', ['Client']);
            break;
            case "Seller":
                $all = $all->where('enterprises.id', Auth::user()->session->subsidiary->business->enterprise->id)
                ->where('subsidiaries.id', Auth::user()->session->subsidiary->id)
                ->whereIn('roles.key', ['Client']);
            break;
            case "Client":
                $all = $all->where('users.id', Auth::user()->id);
            break;
            default:
                $all = $all->where('users.id', 0);
            break;
        }
        $all = $all->orderBy('users.updated_at', 'DESC');
        $all = $all->groupBy('users.id');
        return $all;
    }
}
