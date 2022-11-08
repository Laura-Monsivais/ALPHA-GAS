<?php

namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\Transfer;
use App\Traits\TransferTrait;
use App\Exports\TransfersExport;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class TransferController extends Controller
{
    use TransferTrait;
    /**
     * The name of the controller corresponding model.
     *
     * @var string
     */
    protected $model = Transfer::class;

    public function getTransfers(Request $request)
    {
        $all = $this->queryGetTransfersTrait();
        /* Búsqueda avanzada A-Z */
        if (isset($request->businessId)) {
            $all = $all->where('businesses.id', $request->businessId);
        }
        if (isset($request->categoryId)) {
            $all = $all->where('categories.id', $request->categoryId);
        }
        if (isset($request->createdAtStart)) {
            $all = $all->where('transfers.created_at', '>=', $request->createdAtStart);
        }
        if (isset($request->createdAtEnd)) {
            $all = $all->where('transfers.created_at', '<=', $request->createdAtEnd);
        }
        if (isset($request->enterpriseId)) {
            $all = $all->where('enterprises.id', $request->enterpriseId);
        }
        if (isset($request->inventory_id)) {
            $all = $all->where('transfers.inventory_id', $request->inventory_id);
        }
        if (isset($request->limit)) {
            $all = $all->limit($request->limit);
        }
        if (isset($request->productId)) {
            $all = $all->where('products.id', $request->productId);
        }
        if (isset($request->quantity)) {
            $all = $all->where('transfers.quantity', 'like', '%' . $request->quantity . '%');
        }
        if (isset($request->destination_id)) {
            $all = $all->where('destinations.id', 'like', '%' . $request->destination_id . '%');
        }
        if (isset($request->subsidiaryId)) {
            $all = $all->where('subsidiaries.id', $request->subsidiaryId);
        }
        if (isset($request->originId)) {
            $all = $all->where('origins.id', 'like', '%' . $request->originId . '%');
        }
        if (isset($request->name)) {
            $all = $all->where('transfers.name', 'like', '%' . $request->name . '%');
        }
        if (isset($request->id)) {
            $all = $all->where('transfers.id', $request->id);
            $all = $all->first();
        } else {
            $all = $all->get();
        }
        return response()->json($all);
    }

    public function insertTransfer(Request $request)
    {
        Log::info('Controller insertTransfer. Request:' . $request);
        $this->validate($request, [
            'name' => ['required', 'max:255', 'min:1'],
            'inventory_id' => ['required', 'integer', 'exists:App\Models\Inventory,id'],
            'quantity' => ['required', 'numeric'],
            'destination_id' => ['required', 'integer', 'exists:App\Models\Subsidiary,id']
        ]);
        try {
            $transfer = new Transfer; //TransferObserver created
            $transfer->name = $request->name;
            $transfer->key = "Output";
            $transfer->inventory_id = $request->inventory_id;
            $transfer->quantity = $request->quantity;
            $transfer->destination_id = $request->destination_id;
            $transfer->save();
            $response = response()->json(200);
            Log::alert('Controller insertTransfer. Response:' . $response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json($catchError->getMessage());
            Log::error('Controller insertTransfer. Error:' . $error);
            return $error;
        }
    }

    public function exportTransfers(Request $request)
    {
        return Excel::download(new TransfersExport, 'transfers.xlsx');
    }

    public function updateTransfer(Request $request)
    {
        Log::info('Controller updateTransfer. Request:' . $request);
        $this->validate($request, [
            'id' => ['required', 'integer'],
            'name' => ['required', 'max:255', 'min:1'],
            'inventory_id' => ['required', 'integer', 'exists:App\Models\Inventory,id'],
            'quantity' => ['required', 'numeric'],
            'destination_id' => ['required', 'integer', 'exists:App\Models\Subsidiary,id']
        ]);
        try {
            $transfer = Transfer::find($request->id) //TransferObserver updating
                ->update([
                    'name' => $request->name,
                    'inventory_id' => $request->inventory_id,
                    'quantity' => $request->quantity,
                    'destination_id' => $request->destination_id
                ]);
            $response = response()->json(200);
            Log::alert('Controller updateTransfer. Response:' . $response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json($catchError->getMessage());
            Log::error('Controller updateTransfer. Error:' . $error);
            return $error;
        }
    }

    public function acceptTransfer(Request $request)
    {
        try {
            $transfer = Transfer::where('id', $request->id)->first();
            $productId = Inventory::where('id', $transfer->inventory_id)->pluck('product_id')->first();
            $newtransfer = $transfer->replicate();
            $newtransfer->inventory_id = Inventory::where('product_id', $productId)->where('subsidiary_id', $transfer->destination_id)->pluck('id')->first();
            $newtransfer->key = "Input";
            $newtransfer->status = "Aceptado";
            $newtransfer->save();
            Transfer::where('id', $request['id'])
                ->where('key', "Output")
                ->where('status', "Pendiente")
                ->update([
                    'status' => "Aceptado",
                    'transfer_id' => $newtransfer->id
                ]);
            $response = response()->json(200);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json($catchError->getMessage());
            return $error;
        }
    }
}
