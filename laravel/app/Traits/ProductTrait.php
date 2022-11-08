<?php

namespace App\Traits;

use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

trait ProductTrait 
{
    
    public function queryGetProductsTrait($request = null)
    {
        $all = Product::select(DB::raw('DISTINCT(products.id) AS id'), 
            'products.name',
            'products.image',
            'products.description',
            'products.content',
            'products.unit',
            'products.cost',
            'products.price',
            'enterprises.id AS enterpriseId',
            'enterprises.name AS enterpriseName',
            'products.business_id',
            'businesses.name AS businessName',
            DB::raw('IFNULL(products.category_id,0) AS category_id'),
            'categories.name AS categoryName',
            'products.created_at', 
            'products.updated_at',
            DB::raw('(1) AS quantity'),
            DB::raw('(1) AS density'),
            DB::raw('(1) AS conversion'),
            'products.cost AS amountCost',
            'products.price AS amountPrice',
            'leftJoin_inventories.id AS inventoryId',            
            'leftJoin_inventories.inventory_theoretical AS inventoryTheoretical')
        ->whereNull('products.deleted_at')        
        ->join('businesses', 'businesses.id', 'products.business_id')
        ->join('enterprises', 'enterprises.id', 'businesses.enterprise_id')
        ->leftJoin('categories', 'categories.id', 'products.category_id');
        switch(Auth::user()->session->rol->key){
            case "Super":
            break;
            case "Director":
                //$all = $all->where('products.enterprise_id', Auth::user()->session->subsidiary->business->enterprise->id);
            break;
            case "Manager":
                $all = $all->where('products.business_id', Auth::user()->session->subsidiary->business->id);
            break;
            case "Call_Center":
                $all = $all->where('products.business_id', Auth::user()->session->subsidiary->business->id);
            break;
            case "Seller":
                $all = $all->where('products.business_id', Auth::user()->session->subsidiary->business->id);
            break;
            case "Client":
                $all = $all->where('products.business_id', Auth::user()->session->subsidiary->business->id);
            break;
            default:
                $all = $all->where('products.id', 0);
            break;
        }
        $all = $all->orderBy('products.updated_at', 'DESC');
        
        /* Búsqueda avanzada A-Z */
        if (isset($request->business_id)) {
            $all = $all->where('products.business_id', $request->business_id);
        }
        if (isset($request->category_id)) {
            $all = $all->where('products.category_id', $request->category_id);
        }
        if (isset($request->createdAtStart)) {
            $all = $all->where('products.created_at', '>=', $request->createdAtStart);
        }
        if (isset($request->createdAtEnd)) {
            $all = $all->where('products.created_at', '<=', $request->createdAtEnd);
        }
        if (isset($request->content)) {
            $all = $all->where('products.content', 'like', '%' . $request->content . '%');
        }
        if (isset($request->cost)) {
            $all = $all->where('products.cost', 'like', '%' . $request->cost . '%');
        }
        if (isset($request->description)) {
            $all = $all->where('products.description', 'like', '%' . $request->description . '%');
        }
        if (isset($request->enterpriseId)) {
            $all = $all->where('enterprises.id', $request->enterpriseId);
        }
        if (isset($request->limit)) {
            $all = $all->limit($request->limit);
        }
        if (isset($request->name)) {
            $all = $all->where('products.name', 'like', '%' . $request->name . '%');
        }
        if (isset($request->search)) {
            $all = $all->where(function ($query) use ($request) {
                $query->orWhere('products.content', 'like', '%' . $request->search . '%')
                    ->orWhere('products.cost', 'like', '%' . $request->search . '%')
                    ->orWhere('products.description', 'like', '%' . $request->search . '%')
                    ->orWhere('products.name', 'like', '%' . $request->search . '%')
                    ->orWhere('products.price', 'like', '%' . $request->search . '%')
                    ->orWhere('products.unit', 'like', '%' . $request->search . '%');
            });
        }
        if(isset($request->subsidiaryId)) {
            $all = $all->leftJoin('inventories AS leftJoin_inventories', 'leftJoin_inventories.product_id', 'products.id')
            ->where('leftJoin_inventories.subsidiary_id', $request->subsidiaryId);
        } else {
            $all = $all->leftJoin(DB::raw('(SELECT inventories.* 
                FROM inventories 
                ORDER BY inventories.updated_at DESC
                LIMIT 1) AS leftJoin_inventories'), 
                function ($join) {
                    $join->on('leftJoin_inventories.product_id', 'products.id');
                }
            );
        }
        if (isset($request->price)) {
            $all = $all->where('products.price', 'like', '%' . $request->price . '%');
        }
        if (isset($request->unit)) {
            $all = $all->where('products.unit', 'like', '%' . $request->unit . '%');
        }
        /* Búsqueda avanzada A-Z */
        if (isset($request->id)) {
            $all = $all->where('products.id', $request->id);
            $all = $all->first();
        } else {
            $all = $all->get();
        }
        return $all;
    }
}