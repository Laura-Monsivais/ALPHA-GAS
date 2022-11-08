<?php

namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\SaleDetail;
use App\Traits\SaleDetailTrait;
use Illuminate\Http\Request;

class SaleDetailController extends Controller
{
    use SaleDetailTrait;
    /**
     * The name of the controller corresponding model.
     *
     * @var string
     */
    protected $model = SaleDetail::class;

    public function getSaleDetails(Request $request)
    {
        $all = $this->queryGetSaleDetailsTrait();
        /* Búsqueda avanzada A-Z */ 
        if (isset($request->products)) {
            $all = $all->whereNotNull('sale_details.product_id');
        }
        if (isset($request->promotions)) {
            $all = $all->whereNotNull('sale_details.promotion_id');
        }
        if (isset($request->sale_id)) {     
            $all->where('sale_details.sale_id', $request->sale_id);
        }
        if (isset($request->services)) {
            $all = $all->whereNotNull('sale_details.service_id');
        }
        if (isset($request->sessions)) {
            $all = $all->whereNotNull('sales.client_id');
        }
        /* Búsqueda avanzada A-Z */ 
        if (isset($request->id)) {
            $all = $all->where('sale_details.id', $request->id);
            $all = $all->first();
        } else {
            $all = $all->get();            
        }
        return response()->json($all);
    }
}
