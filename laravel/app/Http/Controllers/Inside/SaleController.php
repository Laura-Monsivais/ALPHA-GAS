<?php

namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Sale;
use App\Models\SaleDetail;
use App\Traits\SaleTrait;
use App\Exports\SalesExport;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class SaleController extends Controller
{
    use SaleTrait;
    /**
     * The name of the controller corresponding model.
     *
     * @var string
     */
    protected $model = Sale::class;

    public function getSales(Request $request)
    {
        $all = $this->queryGetSalesTrait();
        /* Búsqueda avanzada A-Z */
        if (isset($request->businessId)) {
            $all = $all->where('businesses.id', $request->businessId);
        }
        if (isset($request->createdAtStart)) {
            $all = $all->where('sales.created_at', '>=', $request->createdAtStart);
        }
        if (isset($request->createdAtEnd)) {
            $all = $all->where('sales.created_at', '<=', $request->createdAtEnd);
        }
        if (isset($request->enterpriseId)) {
            $all = $all->where('enterprises.id', $request->enterpriseId);
        }
        if (isset($request->limit)) {
            $all = $all->limit($request->limit);
        }
        if (isset($request->seller_id)) {
            $all = $all->where('sales.seller_id', $request->seller_id);
        }
        if (isset($request->subsidiaryId)) {
            $all = $all->where('subsidiaries.id', $request->subsidiaryId);
        }
        /* Búsqueda avanzada A-Z */
        if (isset($request->id)) {
            $all = $all->where('sales.id', $request->id);
            $all = $all->first();
        } else {
            $all = $all->get();
        }
        return response()->json($all);
    }

    public function insertSale(Request $request)
    {
        Log::info('Controller insertSale. Request:'.$request);
        $this->validate($request, [
            'seller_id' => ['required', 'integer', 'exists:App\Models\Session,id'],
            'total' => ['required', 'numeric']
        ]);
        DB::beginTransaction();
        try {
            $saleId = Sale::insertGetId([
                'seller_id' => $request->seller_id,
                'client_id' => ($request['client_id'] != 0) ? $request['client_id']  : NULL,
                'order_id' => ($request['order_id'] != 0) ? $request['order_id'] : NULL,
                'total' => $request->total
            ]);
            //Promotions
            foreach ($request['saleDetailPromotions'] as $saleDetailPromotion) {
                $saleDetail = new SaleDetail;//SaleDetailObserver created
                $saleDetail->sale_id = $saleId;
                $saleDetail->promotion_id = $saleDetailPromotion['promotion_id'];
                $saleDetail->quantity = $saleDetailPromotion['quantity'];
                $saleDetail->price = $saleDetailPromotion['price'];
                $saleDetail->amount = $saleDetailPromotion['amount'];
                $saleDetail->save();
            }
            //Products
            foreach ($request['saleDetailProducts'] as $saleDetailProduct) {
                $saleDetail = new SaleDetail;//SaleDetailObserver created
                $saleDetail->sale_id = $saleId;
                $saleDetail->inventory_id = $saleDetailProduct['inventoryId'];
                $saleDetail->product_id = $saleDetailProduct['product_id'];
                $saleDetail->quantity = $saleDetailProduct['quantity'];
                $saleDetail->price = $saleDetailProduct['price'];
                $saleDetail->amount = $saleDetailProduct['amount'];
                $saleDetail->save();
            }
            foreach ($request['saleDetailServices'] as $saleDetailService) {
                $saleDetail = new SaleDetail;//SaleDetailObserver created
                $saleDetail->sale_id = $saleId;
                $saleDetail->service_id = $saleDetailService['service_id'];
                $saleDetail->quantity = $saleDetailService['quantity'];
                $saleDetail->price = $saleDetailService['price'];
                $saleDetail->amount = $saleDetailService['amount'];
                $saleDetail->save();
            }
            if ($request['order_id'] != 0) {
                Order::where('id', $request['order_id'])
                ->where('status', "Pendiente")
                ->update([
                    'status' => "Atendiendo"
                ]);
            }
            DB::commit();
            $response = response()->json(200);
            Log::alert('Controller insertSale. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            DB::rollBack();
            $error = response()->json($catchError->getMessage());
            Log::error('Controller insertSale. Error:'.$error);
            return $error;
        }
    }

    public function exportSales(Request $request)
    {
        return Excel::download(new SalesExport, 'sales.xlsx');
    }

    public function updateSale(Request $request)
    {
        Log::info('Controller updateSale. Request:'.$request);
        $this->validate($request, [
            'id' => ['required', 'integer'],
            'seller_id' => ['required', 'integer', 'exists:App\Models\Session,id'],
            'total' => ['required', 'numeric']
        ]);
        DB::beginTransaction();
        try {
            Sale::where('id', $request->id)
            ->update([
                'seller_id' => $request->seller_id,
                'client_id' => ($request->client_id != 0) ? $request->client_id  : NULL,
                'order_id' => ($request->order_id != 0) ? $request->order_id : NULL,
                'total' => $request->total
            ]);
            $saleDetails = SaleDetail::where('sale_id', $request->id)->get();
            foreach ($saleDetails as $saleDetail) {
                SaleDetail::find($saleDetail['id'])//SaleDetailObserver updating
                ->update(['deleted_at' => Carbon::now()]);
            }
            //Promotions
            foreach ($request['saleDetailPromotions'] as $saleDetail) {
                if (isset($saleDetail['id'])) {
                    SaleDetail::find($saleDetail['id'])//SaleDetailObserver updating
                    ->update([
                        'promotion_id' => $saleDetail['promotion_id'],
                        'quantity' => $saleDetail['quantity'],
                        'price' => $saleDetail['price'],
                        'amount' => $saleDetail['amount'],
                        'deleted_at' => null
                    ]);
                } else {
                    $saleDetailUnique = SaleDetail::where('sale_id', $request->id)
                    ->where('promotion_id', $saleDetail['promotion_id'])
                    ->where('price', $saleDetail['price'])
                    ->first();
                    if (isset($saleDetailUnique->id)) {
                        SaleDetail::find($saleDetailUnique->id)//SaleDetailObserver updating
                        ->update([
                            'quantity' => $saleDetail['quantity'],
                            'amount' => $saleDetail['amount'],
                            'deleted_at' => NULL
                        ]);
                    } else {
                        $saleDetail = new SaleDetail;//SaleDetailObserver created
                        $saleDetail->sale_id = $request->id;
                        $saleDetail->promotion_id = $saleDetail['promotion_id'];
                        $saleDetail->quantity = $saleDetail['quantity'];
                        $saleDetail->price = $saleDetail['price'];
                        $saleDetail->amount = $saleDetail['amount'];
                        $saleDetail->save();
                    }
                }
            }
            //Products
            foreach ($request['saleDetailProducts'] as $saleDetail) {
                if (isset($saleDetail['id'])) {
                    SaleDetail::find($saleDetail['id'])//SaleDetailObserver updating
                    ->update([
                        'inventory_id' => $saleDetail['inventoryId'],
                        'product_id' => $saleDetail['product_id'],
                        'quantity' => $saleDetail['quantity'],
                        'price' => $saleDetail['price'],
                        'amount' => $saleDetail['amount'],
                        'deleted_at' => NULL
                    ]);
                } else {
                    $saleDetailUnique = SaleDetail::where('sale_id', $request->id)
                    ->where('inventory_id', $saleDetail['inventory_id'])
                    ->where('product_id', $saleDetail['product_id'])
                    ->where('price', $saleDetail['price'])
                    ->first();
                    if (isset($saleDetailUnique->id)) {
                        SaleDetail::find($saleDetailUnique->id)//SaleDetailObserver updating
                        ->update([
                            'quantity' => $saleDetail['quantity'],
                            'amount' => $saleDetail['amount'],
                            'deleted_at' => NULL
                        ]);
                    } else {
                        $saleDetail = new SaleDetail;//SaleDetailObserver created
                        $saleDetail->sale_id = $request->id;
                        $saleDetail->inventory_id = $saleDetail['inventoryId'];
                        $saleDetail->product_id = $saleDetail['product_id'];
                        $saleDetail->quantity = $saleDetail['quantity'];
                        $saleDetail->price = $saleDetail['price'];
                        $saleDetail->amount = $saleDetail['amount'];
                        $saleDetail->save();
                    }
                }
            }
            //Services
            foreach ($request['saleDetailServices'] as $saleDetail) {
                if (isset($saleDetail['id'])) {
                    SaleDetail::find($saleDetail['id'])//SaleDetailObserver updating
                    ->update([
                        'service_id' => $saleDetail['service_id'],
                        'quantity' => $saleDetail['quantity'],
                        'price' => $saleDetail['price'],
                        'amount' => $saleDetail['amount'],
                        'deleted_at' => NULL
                    ]);
                } else {
                    $saleDetailUnique = SaleDetail::where('sale_id', $request->id)
                    ->where('service_id', $saleDetail['service_id'])
                    ->where('price', $saleDetail['price'])
                    ->first();
                    if (isset($saleDetailUnique->id)) {
                        SaleDetail::find($saleDetailUnique->id)//SaleDetailObserver updating
                        ->update([
                            'quantity' => $saleDetail['quantity'],
                            'amount' => $saleDetail['amount'],
                            'deleted_at' => NULL
                        ]);
                    } else {
                        $saleDetail = new SaleDetail;//SaleDetailObserver created
                        $saleDetail->sale_id = $request->id;
                        $saleDetail->service_id = $saleDetail['service_id'];
                        $saleDetail->quantity = $saleDetail['quantity'];
                        $saleDetail->price = $saleDetail['price'];
                        $saleDetail->amount = $saleDetail['amount'];
                        $saleDetail->save();
                    }
                }
            }
            DB::commit();
            $response = response()->json(200);
            Log::alert('Controller updateSale. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            DB::rollBack();
            $error = response()->json($catchError->getMessage());
            Log::error('Controller updateSale. Error:'.$error);
            return $error;
        }
    }
}
