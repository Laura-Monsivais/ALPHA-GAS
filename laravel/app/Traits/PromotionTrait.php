<?php

namespace App\Traits;

use App\Models\Promotion;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

trait PromotionTrait 
{
    
    public function queryGetPromotionsTrait()
    {
        $all = Promotion::select('promotions.id',
            'promotions.name',
            'promotions.cost',
            'promotions.expires_at',
            'promotions.price',
            'promotions.enterprise_id',
            'enterprises.name AS enterpriseName',
            DB::raw('IFNULL(promotions.business_id,0) AS business_id'),
            'businesses.name AS businessName',
            DB::raw('IFNULL(promotions.subsidiary_id,0) AS subsidiary_id'),
            'subsidiaries.name AS subsidiaryName',
            'promotions.created_at',
            'promotions.updated_at',
            DB::raw('(1) AS quantity'),
            'promotions.cost AS amountCost',
            'promotions.price AS amountPrice')
        ->whereNull('promotions.deleted_at')
        ->join('enterprises', 'enterprises.id', 'promotions.enterprise_id')
        ->leftJoin('businesses', 'businesses.id', 'promotions.business_id')
        ->leftJoin('subsidiaries', 'subsidiaries.id', 'promotions.subsidiary_id');
        switch (Auth::user()->session->rol->key) {
            case "Super":
            break;
            case "Director":
                $all = $all->where('promotions.enterprise_id', Auth::user()->session->subsidiary->business->enterprise->id);
            break;
            case "Manager":
                $all = $all->where(function ($queryWhere) {
                    $queryWhere->orWhere(function ($queryOrWhere) {
                        $queryOrWhere->where('promotions.enterprise_id', Auth::user()->session->subsidiary->business->enterprise->id)
                        ->whereNull('promotions.business_id');
                    })
                    ->orWhere(function ($queryOrWhere) {
                        $queryOrWhere->where('promotions.business_id', Auth::user()->session->subsidiary->business->id)
                        ->whereNull('promotions.subsidiary_id');
                    })
                    ->orWhere(function ($queryOrWhere) {
                        $queryOrWhere->where('promotions.subsidiary_id', Auth::user()->session->subsidiary_id);
                    });
                });
            break;
            case "Call_Center":
                $all = $all->where(function ($queryWhere) {
                    $queryWhere->orWhere(function ($queryOrWhere) {
                        $queryOrWhere->where('promotions.enterprise_id', Auth::user()->session->subsidiary->business->enterprise->id)
                        ->whereNull('promotions.business_id');
                    })
                    ->orWhere(function ($queryOrWhere) {
                        $queryOrWhere->where('promotions.business_id', Auth::user()->session->subsidiary->business->id)
                        ->whereNull('promotions.subsidiary_id');
                    })
                    ->orWhere(function ($queryOrWhere) {
                        $queryOrWhere->where('promotions.subsidiary_id', Auth::user()->session->subsidiary_id);
                    });
                });
            break;
            case "Seller":
                $all = $all->whereDate('promotions.expires_at', '>', Carbon::today())
                ->where(function ($queryWhere) {
                    $queryWhere->orWhere(function ($queryOrWhere) {
                        $queryOrWhere->where('promotions.enterprise_id', Auth::user()->session->subsidiary->business->enterprise->id)
                        ->whereNull('promotions.business_id');
                    })
                    ->orWhere(function ($queryOrWhere) {
                        $queryOrWhere->where('promotions.business_id', Auth::user()->session->subsidiary->business->id)
                        ->whereNull('promotions.subsidiary_id');
                    })
                    ->orWhere(function ($queryOrWhere) {
                        $queryOrWhere->where('promotions.subsidiary_id', Auth::user()->session->subsidiary_id);
                    });
                });
            break;
            case "Client":
                $all = $all->whereDate('promotions.expires_at', '>', Carbon::today())
                ->where(function ($queryWhere) {
                    $queryWhere->orWhere(function ($queryOrWhere) {
                        $queryOrWhere->where('promotions.enterprise_id', Auth::user()->session->subsidiary->business->enterprise->id)
                        ->whereNull('promotions.business_id');
                    })
                    ->orWhere(function ($queryOrWhere) {
                        $queryOrWhere->where('promotions.business_id', Auth::user()->session->subsidiary->business->id)
                        ->whereNull('promotions.subsidiary_id');
                    })
                    ->orWhere(function ($queryOrWhere) {
                        $queryOrWhere->where('promotions.subsidiary_id', Auth::user()->session->subsidiary_id);
                    });
                });
            break;
            default:
                $all = $all->where('promotions.id', 0);
            break;
        }
        $all = $all->orderBy('promotions.updated_at', 'DESC');
        return $all;
    }
}