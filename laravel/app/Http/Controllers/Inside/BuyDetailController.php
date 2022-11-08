<?php

namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\BuyDetail;
use App\Traits\BuyDetailTrait;
use Illuminate\Http\Request;

class BuyDetailController extends Controller
{
    use BuyDetailTrait;
    /**
     * The name of the controller corresponding model.
     *
     * @var string
     */
    protected $model = BuyDetail::class;

    public function getBuyDetails(Request $request)
    {
        $all = $this->queryGetBuyDetailsTrait();
        /* Búsqueda avanzada A-Z */    
        if (isset($request->limit)) {
            $all = $all->limit($request->limit);
        }
        if (isset($request->products)) {
            $all = $all->whereNotNull('buy_details.product_id');
        }
        if (isset($request->services)) {
            $all = $all->whereNotNull('buy_details.service_id');
        }
        if (isset($request->amount)) {
            $all = $all->where('buy_details.amount', 'like', '%' . $request->amount . '%');
        }
        if (isset($request->conversion)) {
            $all = $all->where('buy_details.conversion', 'like', '%' . $request->conversion . '%');
        }
        if (isset($request->density)) {
            $all = $all->where('buy_details.density', 'like', '%' . $request->density . '%');
        }
        if (isset($request->quantity)) {
            $all = $all->where('buy_details.quantity', 'like', '%' . $request->quantity . '%');
        }
        if (isset($request->cost)) {
            $all = $all->where('buy_details.cost', 'like', '%' . $request->cost . '%');
        }
        if (isset($request->buyId)) {
            $all = $all->where('buys.id', $request->buyId);
        }
        /* Búsqueda avanzada A-Z */    
        if (isset($request->id)) {
            $all = $all->where('buy_details.id', $request->id);
            $all = $all->first();
        } else {
            $all = $all->get();            
        }
        return response()->json($all);
    }
}
