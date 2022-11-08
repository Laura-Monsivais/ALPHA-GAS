<?php

namespace App\Traits;

use App\Models\Business;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

trait BusinessTrait 
{
    
    public function queryGetBusinessesTrait()
    {
        $all = Business::select('businesses.id', 
            'businesses.name',
            'businesses.enterprise_id',
            'enterprises.name AS enterpriseName',
            'businesses.attention_id',
            'attentions.name AS attentionName',
            'businesses.created_at', 
            'businesses.updated_at')
        ->whereNull('businesses.deleted_at')        
        ->join('enterprises', 'enterprises.id', 'businesses.enterprise_id')
        ->join('attentions', 'attentions.id', 'businesses.attention_id');
        switch (Auth::user()->session->rol->key) {
            case "Super":
            break;
            case "Director":
                $all = $all->where('enterprises.id', Auth::user()->session->subsidiary->business->enterprise->id);
            break;
            case "Manager":
                $all = $all->where('businesses.id', Auth::user()->session->subsidiary->business->id);
            break;
            case "Call_Center":
                $all = $all->where('businesses.id', Auth::user()->session->subsidiary->business->id);
            break;
            case "Seller":
                $all = $all->where('businesses.id', Auth::user()->session->subsidiary->business->id);
            break;
            case "Client":
                $all = $all->where('businesses.id', Auth::user()->session->subsidiary->business->id);
            break;
            default:
                $all = $all->where('businesses.id', 0);
            break;
        }    
        $all = $all->orderBy('businesses.updated_at', 'DESC');
        return $all;
    }
}