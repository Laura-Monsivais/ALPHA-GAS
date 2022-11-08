<?php

namespace App\Traits;

use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

trait CategoryTrait 
{
    
    public function queryGetCategoriesTrait()
    {
        $all = Category::select('categories.id', 
            'categories.name',
            'enterprises.id AS enterpriseId',
            'enterprises.name AS enterpriseName',
            'categories.business_id',
            'businesses.name AS businessName',
            'categories.created_at', 
            'categories.updated_at')
        ->whereNull('categories.deleted_at')        
        ->join('businesses', 'businesses.id', 'categories.business_id')
        ->join('enterprises', 'enterprises.id', 'businesses.enterprise_id');
        switch(Auth::user()->session->rol->key){
            case "Super":
            break;
            case "Director":
                $all = $all->where('businesses.enterprise_id', Auth::user()->session->subsidiary->business->enterprise->id);
            break;
            case "Manager":
                $all = $all->where('categories.business_id', Auth::user()->session->subsidiary->business->id);
            break;
            case "Call_Center":
                $all = $all->where('categories.id', 0);
            break;
            case "Seller":
                $all = $all->where('categories.id', 0);
            break;
            case "Client":
                $all = $all->where('categories.id', 0);
            break;
            default:
                $all = $all->where('categories.id', 0);
            break;
        }
        $all = $all->orderBy('categories.updated_at', 'DESC');
        return $all;
    }
}