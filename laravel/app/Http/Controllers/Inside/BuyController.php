<?php

namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\Buy;
use App\Models\BuyDetail;
use App\Traits\BuyTrait;
use App\Exports\BuysExport;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class BuyController extends Controller
{
    use BuyTrait;
    /**
     * The name of the controller corresponding model.
     *
     * @var string
     */
    protected $model = Buy::class;

    public function getBuys(Request $request)
    {
        $all = $this->queryGetBuysTrait();
        /* Búsqueda avanzada A-Z */    
        if (isset($request->limit)) {
            $all = $all->limit($request->limit);
        }
        if (isset($request->search)) {
            $all = $all->where(function ($query) use ($request) {
                $query->orWhere('sellers.name', 'like', '%' . $request->search . '%');
            });
        }
        if (isset($request->seller)) {
            $all = $all->where(function ($query) use ($request) {
                $query->orWhere('sellers.name', 'like', '%' . $request->seller . '%');
            });
        }
        /* Búsqueda avanzada A-Z */    
        if (isset($request->id)) {
            $all = $all->where('buys.id', $request->id);
            $all = $all->first();
        } else {
            $all = $all->get();            
        }
        return response()->json($all);
    }
    public function insertBuy(Request $request)
    {
        Log::info('Controller insertBuy. Request:'.$request);
        $this->validate($request, [
            'name' => ['required', 'max:255', 'min:1'],
            'expected_destination_id' => ['required', 'integer', 'exists:App\Models\Subsidiary,id'],
            'total' => ['required', 'numeric']
        ]);
        DB::beginTransaction();
        try {
            $buyId = Buy::insertGetId([
                'name' => $request->name,
                'provenance' => $request->provenance,
                'transport' => $request->transport,
                'embarked_at' => $request->embarked_at,
                'expected_destination_id' => $request->expected_destination_id,
                'destination_id' => ($request['destination_id'] != 0) ? $request['destination_id']  : NULL,
                'downloaded_at' => $request->downloaded_at,
                'total' => $request->total
            ]);
            //Products
            foreach ($request['buyDetailProducts'] as $buyDetailProduct) {
                $buyDetail = new BuyDetail;//BuyDetailObserver created
                $buyDetail->buy_id = $buyId;
                $buyDetail->inventory_id = $buyDetailProduct['inventoryId'];
                $buyDetail->density = $buyDetailProduct['density'];
                $buyDetail->conversion = $buyDetailProduct['conversion'];
                $buyDetail->product_id = $buyDetailProduct['product_id'];
                $buyDetail->quantity = $buyDetailProduct['quantity'];
                $buyDetail->cost = $buyDetailProduct['cost'];
                $buyDetail->amount = $buyDetailProduct['amount'];
                $buyDetail->save();
            }
            //Services
            foreach ($request['buyDetailServices'] as $buyDetailService) {
                $buyDetail = new BuyDetail;//BuyDetailObserver created
                $buyDetail->buy_id = $buyId;
                $buyDetail->service_id = $buyDetailService['service_id'];
                $buyDetail->quantity = $buyDetailService['quantity'];
                $buyDetail->cost = $buyDetailService['cost'];
                $buyDetail->amount = $buyDetailService['amount'];
                $buyDetail->save();
            }
            DB::commit();
            $response = response()->json(200);
            Log::alert('Controller insertBuy. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            DB::rollBack();
            $error = response()->json($catchError->getMessage());
            Log::error('Controller insertBuy. Error:'.$error);
            return $error;
        }
    }

    public function exportBuys(Request $request)
    {
        return Excel::download(new BuysExport, 'buys.xlsx');
    }
    public function updateBuy(Request $request)
    {
        Log::info('Controller updateBuy. Request:'.$request);
        $this->validate($request, [
            'id' => ['required', 'integer'],
            'name' => ['required', 'max:255', 'min:1'],
            'expected_destination_id' => ['required', 'integer', 'exists:App\Models\Subsidiary,id'],
            'total' => ['required', 'numeric']
        ]);
        DB::beginTransaction();
        try {
            Buy::where('id', $request->id)
            ->update([
                'name' => $request->name,
                'provenance' => $request->provenance,
                'transport' => $request->transport,
                'embarked_at' => $request->embarked_at,
                'expected_destination_id' => $request->expected_destination_id,
                'destination_id' => ($request['destination_id'] != 0) ? $request['destination_id']  : NULL,
                'downloaded_at' => $request->downloaded_at,
                'total' => $request->total
            ]);
            $buyDetails = BuyDetail::where('buy_id', $request->id)->get();
            foreach ($buyDetails as $buyDetail) {
                BuyDetail::find($buyDetail['id'])//BuyDetailObserver updating
                ->update(['deleted_at' => Carbon::now()]);
            }
            //Products
            foreach ($request['buyDetailProducts'] as $buyDetail) {
                if (isset($buyDetail['id'])) {
                    BuyDetail::find($buyDetail['id'])//BuyDetailObserver updating
                    ->update([
                        'inventory_id' => $buyDetail['inventoryId'],
                        'density' => $buyDetail['density'],
                        'conversion' => $buyDetail['conversion'],
                        'product_id' => $buyDetail['product_id'],
                        'quantity' => $buyDetail['quantity'],
                        'cost' => $buyDetail['cost'],
                        'amount' => $buyDetail['amount'],
                        'deleted_at' => NULL
                    ]);
                } else {
                    $buyDetailUnique = BuyDetail::where('buy_id', $request->id)
                    ->where('inventory_id', $buyDetail['inventoryId'])
                    ->where('product_id', $buyDetail['product_id'])
                    ->where('cost', $buyDetail['cost'])
                    ->first();
                    if (isset($buyDetailUnique->id)) {
                        BuyDetail::find($buyDetailUnique->id)//BuyDetailObserver updating
                        ->update([
                            'quantity' => $buyDetail['quantity'],
                            'amount' => $buyDetail['amount'],
                            'deleted_at' => NULL
                        ]);
                    } else {
                        $buyDetail = new BuyDetail;//BuyDetailObserver created
                        $buyDetail->buy_id = $request->id;
                        $buyDetail->inventory_id = $buyDetail['inventoryId'];
                        $buyDetail->density = $buyDetail['density'];
                        $buyDetail->conversion = $buyDetail['conversion'];
                        $buyDetail->product_id = $buyDetail['product_id'];
                        $buyDetail->quantity = $buyDetail['quantity'];
                        $buyDetail->cost = $buyDetail['cost'];
                        $buyDetail->amount = $buyDetail['amount'];
                        $buyDetail->save();
                    }
                }
            }
            //Services
            foreach ($request['buyDetailServices'] as $buyDetail) {
                if (isset($buyDetail['id'])) {
                    BuyDetail::find($buyDetail['id'])//BuyDetailObserver updating
                    ->update([
                        'service_id' => $buyDetail['service_id'],
                        'quantity' =>  $buyDetail['quantity'],
                        'cost' => $buyDetail['cost'],
                        'amount' => $buyDetail['amount'],
                        'deleted_at' => NULL
                    ]);
                } else {
                    $buyDetailUnique = BuyDetail::where('buy_id', $request->id)
                    ->where('service_id', $buyDetail['service_id'])
                    ->where('cost', $buyDetail['cost'])
                    ->first();
                    if (isset($buyDetailUnique->id)) {
                        BuyDetail::find($buyDetailUnique->id)//BuyDetailObserver updating
                        ->update([
                            'quantity' => $buyDetail['quantity'],
                            'amount' => $buyDetail['amount'],
                            'deleted_at' => NULL
                        ]);
                    } else {
                        $buyDetail = new BuyDetail;//BuyDetailObserver created
                        $buyDetail->buy_id = $request->id;
                        $buyDetail->service_id = $buyDetail['service_id'];
                        $buyDetail->quantity = $buyDetail['quantity'];
                        $buyDetail->cost = $buyDetail['cost'];
                        $buyDetail->amount = $buyDetail['amount'];
                        $buyDetail->save();
                    }
                }
            }
            DB::commit();
            $response = response()->json(200);
            Log::alert('Controller updateBuy. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            DB::rollBack();
            $error = response()->json($catchError->getMessage());
            Log::error('Controller updateBuy. Error:'.$error);
            return $error;
        }
    }
}
