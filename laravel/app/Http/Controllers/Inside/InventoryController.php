<?php

namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use App\Traits\InventoryTrait;
use App\Exports\InventoriesExport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class InventoryController extends Controller
{
    use InventoryTrait;
    /**
     * The name of the controller corresponding model.
     *
     * @var string
     */
    protected $model = Inventory::class;

    public function getInventories(Request $request)
    {
        $all = $this->queryGetInventoryTrait();

        if (isset($request->limit)) {
            $all = $all->limit($request->limit);
        }
        if (isset($request->createdAtStart)) {
            $all = $all->where('inventories.created_at', '>=', $request->createdAtStart);
        }
        if (isset($request->createdAtEnd)) {
            $all = $all->where('inventories.created_at', '<=', $request->createdAtEnd);
        }
        if (isset($request->earning)) {
            switch ($request->earning) {
                case 1:
                    $all = $all->where('inventories.earnings', '>', 0);
                    break;
                case 2:
                    $all = $all->where('inventories.earnings', '<', 0);
                    break;
                default:
                    break;
            }
        }
        if (isset($request->donations)) {
            $all = $all->where('inventories.donations', 'like', '%' . $request->donations . '%');
        }
        if (isset($request->selfconsumptions)) {
            $all = $all->where('inventories.selfconsumptions', 'like', '%' . $request->selfconsumptions . '%');
        }
        if (isset($request->sales)) {
            $all = $all->where('inventories.sales', 'like', '%' . $request->sales . '%');
        }
        if (isset($request->buys)) {
            $all = $all->where('inventories.buys', 'like', '%' . $request->buys . '%');
        }
        if (isset($request->inventory_difference)) {
            switch ($request->inventory_difference) {
                case 1:
                    $all = $all->where('inventories.inventory_difference', '=', 0);
                    break;
                case 2:
                    $all = $all->where('inventories.inventory_difference', '<', 0);
                    break;
                case 3:
                    $all = $all->where('inventories.inventory_difference', '>', 0);
                    break;
                default:
                    break;
            }
        }
        if (isset($request->inventoryReal)) {
            $all = $all->where('inventories.inventory_real', 'like', '%' . $request->inventoryReal . '%');
        }
        if (isset($request->inventory_theoretical)) {
            $all = $all->where('inventories.inventory_theoretical', 'like', '%' . $request->inventory_theoretical . '%');
        }
        if (isset($request->categoryId)) {
            $all = $all->where('categories.id', $request->categoryId);
        }
        if (isset($request->product_id)) {
            $all = $all->where('inventories.product_id', $request->product_id);
        }
        if (isset($request->subsidiary_id)) {
            $all = $all->where('inventories.subsidiary_id', $request->subsidiary_id);
        }
        if (isset($request->businessId)) {
            $all = $all->where('businesses.id', $request->businessId);
        }
        if (isset($request->enterpriseId)) {
            $all = $all->where('enterprises.id', $request->enterpriseId);
        }
        if (isset($request->id)) {
            $all = $all->where('inventories.id', $request->id);
            $all = $all->first();
        } else {
            $all = $all->get();
        }
        return response()->json($all);

        $all = $all->get();
        return response()->json($all);
    }
    public function updateInventory(Request $request)
    {
        Log::info('Controller updateInventory. Request:' . $request);
        try {
            $inventory = Inventory::find($request->id)
                ->update([
                    'inventory_real' => $request->inventory_real,
                ]);
            $response = response()->json(200);
            Log::alert('Controller updateInventory. Response:' . $response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json($catchError->getMessage());
            Log::error('Controller updateInventory. Error:' . $error);
            return $error;
        }
    }

    public function exportInventories(Request $request)
    {
        return Excel::download(new InventoriesExport, 'inventories.xlsx');
    }
}
