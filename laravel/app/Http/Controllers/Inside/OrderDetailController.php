<?php
namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\OrderDetail;
use App\Traits\OrderDetailTrait;
use Illuminate\Http\Request;

class OrderDetailController extends Controller
{
    use OrderDetailTrait;
    /**
     * The name of the controller corresponding model.
     *
     * @var string
     */
    protected $model = OrderDetail::class;
    
    public function getOrderDetails(Request $request) {
        
        $all = $this->queryGetOrderDetailsTrait(); 
        /* Búsqueda avanzada A-Z */    
        if(isset($request->limit)) {
            $all = $all->limit($request->limit);
        }      
        if (isset($request->order_id)) {
            $all = $all->where('order_details.order_id', $request->order_id);
        }
        if(isset($request->inventories)){
            if($request->inventories === 'yes'){
                $all = $all->where('inventories.inventory_theoretical','!=', 0);
            } else {
                $all = $all->where('inventories.inventory_theoretical','=', 0);
            }
        }
        if(isset($request->products)){
            $all = $all->whereNotNull('order_details.product_id');
        }
        if(isset($request->promotions)){
            $all = $all->whereNotNull('order_details.promotion_id');
        }
        if (isset($request->search)) {
            $all = $all->where(function($query) use ($request) {
                $query->orWhere('order_details.amount', 'like', '%' . $request->search . '%')                
                ->orWhere('order_details.observation', 'like', '%' . $request->search . '%')
                ->orWhere('order_details.price', 'like', '%' . $request->search . '%')
                ->orWhere('order_details.quantity', 'like', '%' . $request->search . '%');
            });
        }  
        /* Búsqueda avanzada A-Z */    
        if (isset($request->id)) {
            $all = $all->where('order_details.id', $request->id);
            $all = $all->first();
        } else {
            $all = $all->get();            
        }
        return response()->json($all);
    }
}