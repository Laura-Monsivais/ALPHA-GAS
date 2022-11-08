<?php

namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\SelfconsumptionModel;
use App\Traits\SelfconsumptionTrait;
use App\Exports\SelfconsumptionsExport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class SelfConsumptionController extends Controller
{
    use SelfconsumptionTrait;
    /**
     * The name of the controller corresponding model.
     *
     * @var string
     */
    protected $model = SelfconsumptionModel::class;

    public function getSelfconsumptions(Request $request)
    {
        $all = $this->queryGetSelfconsumptionsTrait();
        /* Búsqueda avanzada A-Z */
        if (isset($request->businessId)) {
            $all = $all->where('businesses.id', $request->businessId);
        }
        if (isset($request->categoryId)) {
            $all = $all->where('categories.id', $request->categoryId);
        }
        if (isset($request->cost)) {
            $all = $all->where('selfconsumptions.cost', 'like', '%' . $request->cost . '%');
        }
        if (isset($request->createdAtStart)) {
            $all = $all->where('selfconsumptions.created_at', '>=', $request->createdAtStart);
        }
        if (isset($request->createdAtEnd)) {
            $all = $all->where('selfconsumptions.created_at', '<=', $request->createdAtEnd);
        }
        if (isset($request->end_mileage)) {
            $all = $all->where('selfconsumptions.end_mileage', 'like', '%' . $request->end_mileage . '%');
        }
        if (isset($request->endStart)) {
            $all = $all->where('selfconsumptions.end', '>=', $request->endStart);
        }
        if (isset($request->endEnd)) {
            $all = $all->where('selfconsumptions.end', '<=', $request->endEnd);
        }
        if (isset($request->enterpriseId)) {
            $all = $all->where('enterprises.id', $request->enterpriseId);
        }
        if (isset($request->initial_mileage)) {
            $all = $all->where('selfconsumptions.initial_mileage', 'like', '%' . $request->initial_mileage . '%');
        }
        if (isset($request->inventory_id)) {
            $all = $all->where('selfconsumptions.inventory_id', $request->inventory_id);
        }
        if (isset($request->limit)) {
            $all = $all->limit($request->limit);
        }
        if (isset($request->performance)) {
            $all = $all->where('selfconsumptions.performance', 'like', '%' . $request->performance . '%');
        }
        if (isset($request->productId)) {
            $all = $all->where('products.id', $request->productId);
        }
        if (isset($request->quantity)) {
            $all = $all->where('selfconsumptions.quantity', 'like', '%' . $request->quantity . '%');
        }
        if (isset($request->route_id)) {
            $all = $all->where('selfconsumptions.route_id', $request->route_id);
        }
        if (isset($request->startStart)) {
            $all = $all->where('selfconsumptions.start', '>=', $request->startStart);
        }
        if (isset($request->startEnd)) {
            $all = $all->where('selfconsumptions.start', '<=', $request->startEnd);
        }
        if (isset($request->subsidiaryId)) {
            $all = $all->where('subsidiaries.id', $request->subsidiaryId);
        }
        if (isset($request->total)) {
            $all = $all->where('selfconsumptions.total', 'like', '%' . $request->total . '%');
        }
        /* Búsqueda avanzada A-Z */
        if (isset($request->id)) {
            $all = $all->where('selfconsumptions.id', $request->id);
            $all = $all->first();
        } else {
            $all = $all->get();
        }
        return response()->json($all);
    }
    public function insertSelfconsumption(Request $request)
    {
        Log::info('Controller insertSelfconsumption. Request:'.$request);
        $this->validate($request, [
            'inventory_id' => ['required', 'integer', 'exists:App\Models\Inventory,id'],
            'quantity' => ['required', 'numeric'],
            'cost' => ['required', 'numeric'],
            'total' => ['required', 'numeric'],
            'route_id' => ['required', 'integer', 'exists:App\Models\Route,id'],
            'start' => ['required', 'date'],
            'end' => ['required', 'date', 'after:start'],
            'initial_mileage' => ['required', 'numeric'],
            'end_mileage' => ['required', 'numeric'],
            'performance' => ['required', 'numeric']
        ]);
        try {
            $selfconsumption = new Selfconsumption;//SelfconsumptionObserver created
            $selfconsumption->inventory_id = $request->inventory_id;
            $selfconsumption->quantity = $request->quantity;
            $selfconsumption->cost = $request->cost;
            $selfconsumption->total = $request->total;
            $selfconsumption->route_id = $request->route_id;
            $selfconsumption->start = $request->start;
            $selfconsumption->end = $request->end;
            $selfconsumption->initial_mileage  = $request->initial_mileage;
            $selfconsumption->end_mileage = $request->end_mileage;
            $selfconsumption->performance = $request->performance;
            $selfconsumption->save();
            $response = response()->json(200);
            Log::alert('Controller insertSelfconsumption. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json($catchError->getMessage());
            Log::error('Controller insertSelfconsumption. Error:'.$error);
            return $error;
        }
    }

    public function updateSelfconsumption(Request $request)
    {
        Log::info('Controller updateSelfconsumption. Request:'.$request);
        $this->validate($request, [
            'id' => ['required', 'integer'],
            'inventory_id' => ['required', 'integer', 'exists:App\Models\Inventory,id'],
            'quantity' => ['required', 'numeric'],
            'cost' => ['required', 'numeric'],
            'total' => ['required', 'numeric'],
            'route_id' => ['required', 'integer', 'exists:App\Models\Route,id'],
            'start' => ['required', 'date'],
            'end' => ['required', 'date', 'after:start'],
            'initial_mileage' => ['required', 'numeric'],
            'end_mileage' => ['required', 'numeric'],
            'performance' => ['required', 'numeric']
        ]);
        try {
            $selfconsumption = SelfconsumptionModel::find($request->id)//SelfconsumptionObserver updating
            ->update([
                'inventory_id' => $request->inventory_id,
                'quantity' => $request->quantity,
                'cost' => $request->cost,
                'total' => $request->total,
                'route_id' => $request->route_id,
                'start' => $request->start,
                'end' => $request->end,
                'initial_mileage'  => $request->initial_mileage,
                'end_mileage' => $request->end_mileage,
                'performance' => $request->performance
            ]);
            $response = response()->json(200);
            Log::alert('Controller updateSelfconsumption. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json($catchError->getMessage());
            Log::error('Controller updateSelfconsumption. Error:'.$error);
            return $error;
        }
    }
    public function exportSelfconsumption(Request $request)
    {
        return Excel::download(new SelfconsumptionsExport, 'Selfconsumptions.xlsx');
    }
}
