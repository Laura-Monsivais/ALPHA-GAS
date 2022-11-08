<?php

namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Exports\OrdersExport;
use App\Traits\OrderTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class OrderController extends Controller
{
    use OrderTrait;
    /**
     * The name of the controller corresponding model.
     *
     * @var string
     */
    protected $model = Order::class;

    public function getOrders(Request $request)
    {
        $all = $this->queryGetOrdersTrait(); 
        /* Búsqueda avanzada A-Z */
        if (isset($request->address)) {
            $all = $all->where(function($query) use ($request) {
                $query->orWhere('addresses.name', 'like', '%' . $request->address . '%')
                ->orWhere('addresses.street', 'like', '%' . $request->address . '%')
                ->orWhere('addresses.exterior', 'like', '%' . $request->address . '%')
                ->orWhere('addresses.interior', 'like', '%' . $request->address . '%')
                ->orWhere('addresses.postal_code', 'like', '%' . $request->address . '%')
                ->orWhere('addresses.neighborhood', 'like', '%' . $request->address . '%')
                ->orWhere('addresses.city', 'like', '%' . $request->address . '%')
                ->orWhere('addresses.municipality', 'like', '%' . $request->address . '%')
                ->orWhere('addresses.state', 'like', '%' . $request->address . '%')
                ->orWhere('addresses.country', 'like', '%' . $request->address . '%')
                ->orWhere('addresses.references', 'like', '%' . $request->address . '%');
            });
        }
        if (isset($request->address_id)) {
            $all = $all->where('orders.address_id', $request->address_id);
        }
        if (isset($request->businessId)) {
            $all = $all->where('businesses.id', $request->businessId);
        }
        if (isset($request->client)) {
            $all = $all->where(function($query) use ($request) {
                $query->orWhere('users.name', 'like', '%' . $request->client . '%')
                ->orWhere('users.lastname1', 'like', '%' . $request->client . '%')
                ->orWhere('users.lastname2', 'like', '%' . $request->client . '%')
                ->orWhere('users.cellphone', 'like', '%' . $request->client . '%');
            });
        }
        if (isset($request->client_id)) {
            $all = $all->where('orders.client_id', $request->client_id);
        }
        if (isset($request->code)) {
            $all = $all->where('orders.code', 'like', '%' . $request->code . '%');
        }   
        if(isset($request->createdAtStart)) {
            $all = $all->where('orders.created_at', '>=', $request->createdAtStart);
        }
        if(isset($request->createdAtEnd)) {
            $all = $all->where('orders.created_at', '<=', $request->createdAtEnd);
        }
        if(isset($request->deliverAtStart)) {
            $all = $all->where('orders.deliver_at', '>=', $request->deliverAtStart);
        }
        if(isset($request->deliverAtEnd)) {
            $all = $all->where('orders.deliver_at', '<=', $request->deliverAtEnd);
        }
        if (isset($request->enterpriseId)) {
            $all = $all->where('enterprises.id', $request->enterpriseId);
        }
        if(isset($request->limit)) {
            $all = $all->limit($request->limit);
        }  
        if (isset($request->observation)) {
            $all = $all->where('orders.observation', 'like', '%' . $request->observation . '%');
        }      
        if (isset($request->search)) {
            $all = $all->where(function($query) use ($request) {
                $query->orWhere('addresses.name', 'like', '%' . $request->search . '%')
                ->orWhere('addresses.street', 'like', '%' . $request->search . '%')
                ->orWhere('addresses.exterior', 'like', '%' . $request->search . '%')
                ->orWhere('addresses.interior', 'like', '%' . $request->search . '%')
                ->orWhere('addresses.postal_code', 'like', '%' . $request->search . '%')
                ->orWhere('addresses.neighborhood', 'like', '%' . $request->search . '%')
                ->orWhere('addresses.city', 'like', '%' . $request->search . '%')
                ->orWhere('addresses.municipality', 'like', '%' . $request->search . '%')
                ->orWhere('addresses.state', 'like', '%' . $request->search . '%')
                ->orWhere('addresses.country', 'like', '%' . $request->search . '%')
                ->orWhere('addresses.references', 'like', '%' . $request->search . '%')
                ->orWhere('users.name', 'like', '%' . $request->search . '%')
                ->orWhere('users.lastname1', 'like', '%' . $request->search . '%')
                ->orWhere('users.lastname2', 'like', '%' . $request->search . '%')
                ->orWhere('users.cellphone', 'like', '%' . $request->search . '%')
                ->orWhere('orders.code', 'like', '%' . $request->search . '%')
                ->orWhere('orders.deliver_at', 'like', '%' . $request->search . '%')
                ->orWhere('orders.observation', 'like', '%' . $request->search . '%')
                ->orWhere('orders.status', 'like', '%' . $request->search . '%')
                ->orWhere('orders.total', 'like', '%' . $request->search . '%');
            });
        }   
        if (isset($request->status)) {
            $all = $all->where('orders.status', $request->status);
        }
        if (isset($request->subsidiaryId)) {
            $all = $all->where('subsidiaries.id', $request->subsidiaryId);
        }
        if (isset($request->total)) {
            $all = $all->where('orders.total', 'like', '%' . $request->total . '%');
        }
        /* Búsqueda avanzada A-Z */
        if (isset($request->id)) {
            $all = $all->where('orders.id', $request->id);
            $all = $all->first();
        } else {
            $all = $all->get();            
        }
        return response()->json($all);
    }

    public function insertOrder(Request $request)
    {
        Log::info('Controller insertOrder. Request:'.$request);
        $this->validate($request, [
            'total' => ['required', 'numeric'],
            'address_id' => ['required', 'integer', 'exists:App\Models\Address,id'],
            'deliverAtDate' => ['required', 'date'],
            'deliverAtTime' => ['required']
        ]);
        DB::beginTransaction();
        try {
            $code = $this->generateOrderCode();
            $orderId = Order::insertGetId([
                'code' => $code,
                'total' => $request->total,
                'observation' => $request->observation,
                'address_id' => $request->address_id,
                'deliver_at' => $request->deliverAtDate." ".$request->deliverAtTime,
                'client_id' => Auth::user()->session->id/** * @todo cambiar a request */ 
            ]);
            //Promotions
            foreach ($request->orderDetailPromotions as $orderDetail) {
                OrderDetail::insert([
                    'order_id' => $orderId,
                    'promotion_id' => $orderDetail['promotion_id'],
                    'quantity' => $orderDetail['quantity'],
                    'price' => $orderDetail['price'],
                    'amount' => $orderDetail['amount']
                ]);
            }
            //Products
            foreach ($request->orderDetailProducts as $orderDetail) {
                OrderDetail::insert([
                    'order_id' => $orderId,
                    'inventory_id' => $orderDetail['inventoryId'], 
                    'product_id' => $orderDetail['product_id'],
                    'quantity' => $orderDetail['quantity'],
                    'price' => $orderDetail['price'],
                    'amount' => $orderDetail['amount']
                ]);
            }
            DB::commit();
            $response = response()->json(200);
            Log::alert('Controller insertOrder. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            DB::rollBack();
            $error = response()->json($catchError->getMessage());
            Log::error('Controller insertOrder. Error:'.$error);
            return $error;
        }
    }

    public function exportOrders(Request $request) 
    {
        return Excel::download(new OrdersExport, 'orders.xlsx');
    }

    public function updateOrder(Request $request) {
        Log::info('Controller updateOrder. Request:'.$request);
        $this->validate($request, [
            'id' => ['required', 'integer'],
            'total' => ['required', 'numeric'],
            'address_id' => ['required', 'integer', 'exists:App\Models\Address,id'],
            'deliverAtDate' => ['required', 'date'],
            'deliverAtTime' => ['required']
        ]);
        DB::beginTransaction();
        try {
            Order::where('id', $request->id)
            ->where('status', "Pendiente")
            ->update([                
                'total' => $request->total,
                'observation' => $request->observation,
                'address_id' => $request->address_id,
                'deliver_at' => $request->deliverAtDate." ".$request->deliverAtTime
            ]);
            $orderDetails = OrderDetail::where('order_id', $request->id)->get();
            foreach ($orderDetails as $orderDetail) {
                OrderDetail::where('id', $orderDetail['id'])
                ->update(['deleted_at' => Carbon::now()]);
            }
            //Promotions
            foreach ($request->orderDetailPromotions as $orderDetail) {
                if (isset($orderDetail['id'])) {
                    OrderDetail::where('id', $orderDetail['id'])
                    ->update([
                        'promotion_id' => $orderDetail['promotion_id'],
                        'quantity' => $orderDetail['quantity'],
                        'price' => $orderDetail['price'],
                        'amount' => $orderDetail['amount'],
                        'deleted_at' => NULL
                    ]);
                } else {
                    $orderDetailUnique = OrderDetail::where('order_id', $request->id)
                    ->where('promotion_id', $orderDetail['promotion_id'])
                    ->where('price', $orderDetail['price'])
                    ->first();
                    if (isset($orderDetailUnique->id)) {
                        OrderDetail::where('id', $orderDetailUnique->id)
                        ->update([
                            'quantity' => $orderDetail['quantity'],
                            'amount' => $orderDetail['amount'],
                            'deleted_at' => NULL
                        ]);
                    } else {
                        OrderDetail::insert([
                            'order_id' => $request->id,
                            'promotion_id' => $orderDetail['promotion_id'],
                            'quantity' => $orderDetail['quantity'],
                            'price' => $orderDetail['price'],
                            'amount' => $orderDetail['amount']
                        ]);
                    }
                }
            }
            //Products
            foreach ($request->orderDetailProducts as $orderDetail) {
                if (isset($orderDetail['id'])) {
                    OrderDetail::where('id', $orderDetail['id'])
                    ->update([
                        'inventory_id' => $orderDetail['inventoryId'],
                        'product_id' => $orderDetail['product_id'],       
                        'quantity' => $orderDetail['quantity'],
                        'price' => $orderDetail['price'],
                        'amount' => $orderDetail['amount'],
                        'deleted_at' => NULL
                    ]);
                } else {
                    $orderDetailUnique = OrderDetail::where('order_id', $request->id)
                    ->where('inventory_id', $orderDetail['inventoryId'])
                    ->where('product_id', $orderDetail['product_id'])
                    ->where('price', $orderDetail['price'])
                    ->first();
                    if(isset($orderDetailUnique->id)){
                        OrderDetail::where('id', $orderDetailUnique->id)
                        ->update([
                            'quantity' => $orderDetail['quantity'],
                            'amount' => $orderDetail['amount'],
                            'deleted_at' => NULL
                        ]);
                    } else {
                        OrderDetail::insert([
                            'order_id' => $request->id,
                            'inventory_id' => $orderDetail['inventoryId'],
                            'product_id' => $orderDetail['product_id'],
                            'quantity' => $orderDetail['quantity'],
                            'price' => $orderDetail['price'],
                            'amount' => $orderDetail['amount']
                        ]);
                    }
                }
            }
            DB::commit();
            $response = response()->json(200);
            Log::alert('Controller updateOrder. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            DB::rollBack();
            $error = response()->json($catchError->getMessage());
            Log::error('Controller updateOrder. Error:'.$error);
            return $error;
        }
    }

    public function generateOrderCode()
    {
        $validate = false;
        $count = 5;
        while (!$validate) {
            $generateRandomString = app('App\Http\Controllers\Inside\AuthentificationController')->generateRandomString($count);
            $search = Order::where('code', $generateRandomString)->first();
            if (isset($search->id)) {
                $validate = false;
                $count++;
            } else {
                $validate = true;
            }
            if ($count === 10) {
                $validate = true;
            }
        }
        return $generateRandomString;
    }
}
