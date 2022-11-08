<?php

namespace App\Traits;

use App\Models\Subsidiary;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Carbon\Carbon;

trait SubsidiaryTrait 
{
    
    public function queryGetSubsidiariesTrait()
    {
        $all = Subsidiary::select('subsidiaries.id',
            'subsidiaries.name',
            'subsidiaries.is_central',
            DB::raw('IF(subsidiaries.is_central = 1, "Si", "No") AS isCentral'),
            DB::raw('IF(subsidiaries.is_central = 1, "Central", "Sucursal") AS type'),
            'subsidiaries.logo',
            'subsidiaries.overlay',
            'subsidiaries.street',
            'subsidiaries.exterior',
            'subsidiaries.interior',
            'subsidiaries.postal_code',
            'subsidiaries.neighborhood',
            'subsidiaries.city',
            'subsidiaries.municipality',
            'subsidiaries.state',
            'subsidiaries.country',
            'subsidiaries.references',
            'enterprises.id AS enterpriseId',
            'enterprises.name AS enterpriseName',
            'subsidiaries.business_id',
            'businesses.name AS businessName',
            'subsidiaries.created_at',
            'subsidiaries.updated_at')
            ->whereNull('subsidiaries.deleted_at')
            ->join('businesses', 'businesses.id', 'subsidiaries.business_id')
            ->join('enterprises', 'enterprises.id', 'businesses.enterprise_id');
        switch (Auth::user()->session->rol->key) {
            case "Super":
            break;
            case "Director":
                $all = $all->where('enterprises.id', Auth::user()->session->subsidiary->business->enterprise->id);
            break;
            case "Manager":
                $all = $all->where('subsidiaries.id', Auth::user()->session->subsidiary_id);
            break;
            case "Call_Center":
                $all = $all->where('subsidiaries.id', Auth::user()->session->subsidiary_id);
            break;
            case "Seller":
                $all = $all->where('subsidiaries.id', Auth::user()->session->subsidiary_id);
            break;
            case "Client":
                $all = $all->where('subsidiaries.id', Auth::user()->session->subsidiary_id);
            break;
            default:
                $all = $all->where('subsidiaries.id', 0);
            break;
        }
        $all = $all->orderBy('subsidiaries.updated_at', 'DESC');
        return $all;
    }
}
