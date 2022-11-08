<?php

namespace App\Traits;

use App\Models\Session;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

trait SessionTrait
{

    public function queryGetSessionsTrait()
    {
        $all = Session::select('sessions.id',
            'sessions.user_id',
            DB::raw('CONCAT(users.name, " ", users.lastname1, " ", IFNULL(users.lastname2, "")) AS userNameComplete'),
            'users.cellphone  AS userCellphone',
            'enterprises.id AS enterpriseId',
            'enterprises.name AS enterpriseName',
            'businesses.id AS businessId',
            'businesses.name AS businessName',
            'sessions.subsidiary_id',
            'subsidiaries.name AS subsidiaryName',
            'sessions.rol_id',
            'roles.key AS rolKey',
            'roles.name AS rolName',
            'sessions.created_at',
            'sessions.updated_at')
        ->whereNull('sessions.deleted_at')
        ->join('users', 'users.id', 'sessions.user_id')
        ->join('roles', 'roles.id', 'sessions.rol_id')
        ->join('subsidiaries', 'subsidiaries.id', 'sessions.subsidiary_id')
        ->join('businesses', 'businesses.id', 'subsidiaries.business_id')
        ->join('enterprises', 'enterprises.id', 'businesses.enterprise_id');
        switch(Auth::user()->session->rol->key){
            case "Super":
                /*Sin subconsulta*/
            break;
            case "Director":
                /*Sin subconsulta*/
            break;
            case "Manager":
                /*Sin subconsulta*/
            break;
            case "Call_Center":
                /*Sin subconsulta*/
            break;
            case "Seller":
                /*Sin subconsulta*/
            break;
            case "Client":
                /*Sin subconsulta*/
            break;
            default:
                $all = $all->where('sessions.id', 0);
            break;
        }
        $all = $all->orderBy('users.updated_at', 'DESC');
        return $all;
    }
}
