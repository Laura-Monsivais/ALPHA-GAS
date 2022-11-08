<?php

namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use App\Exports\DonationsExport;
use App\Traits\DonationTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class DonationController extends Controller
{
    use DonationTrait;
    /**
     * The name of the controller corresponding model.
     *
     * @var string
     */
    protected $model = Donation::class;

    public function getDonations(Request $request)
    {
        $all = $this->queryGetDonationsTrait();
        /* Búsqueda avanzada A-Z */
        if (isset($request->businessId)) {
            $all = $all->where('businesses.id', $request->businessId);
        }
        if (isset($request->categoryId)) {
            $all = $all->where('categories.id', $request->categoryId);
        }
        if (isset($request->cost)) {
            $all = $all->where('donations.cost', 'like', '%' . $request->cost . '%');
        }
        if (isset($request->createdAtStart)) {
            $all = $all->where('donations.created_at', '>=', $request->createdAtStart);
        }
        if (isset($request->createdAtEnd)) {
            $all = $all->where('donations.created_at', '<=', $request->createdAtEnd);
        }
        if (isset($request->enterpriseId)) {
            $all = $all->where('enterprises.id', $request->enterpriseId);
        }
        if (isset($request->inventory_id)) {
            $all = $all->where('donations.inventory_id', $request->inventory_id);
        }
        if (isset($request->limit)) {
            $all = $all->limit($request->limit);
        }
        if (isset($request->productId)) {
            $all = $all->where('products.id', $request->productId);
        }
        if (isset($request->quantity)) {
            $all = $all->where('donations.quantity', 'like', '%' . $request->quantity . '%');
        }
        if (isset($request->subsidiaryId)) {
            $all = $all->where('subsidiaries.id', $request->subsidiaryId);
        }
        if (isset($request->total)) {
            $all = $all->where('donations.total', 'like', '%' . $request->total . '%');
        }
        /* Búsqueda avanzada A-Z */
        if (isset($request->id)) {
            $all = $all->where('donations.id', $request->id);
            $all = $all->first();
        } else {
            $all = $all->get();
        }
        return response()->json($all);
    }

    public function insertDonation(Request $request)
    {
        Log::info('Controller insertDonation. Request:'.$request);
        $this->validate($request, [
            'name' => ['required', 'max:255', 'min:1'],
            'realized_at' => ['required', 'date'],
            'inventory_id' => ['required', 'integer', 'exists:App\Models\Inventory,id'],
            'quantity' => ['required', 'numeric'],
            'cost' => ['required', 'numeric'],
            'total' => ['required', 'numeric']
        ]);
        try {
            $donation = new Donation;//DonationObserver created
            $donation->name = $request->name;
            $donation->realized_at = $request->realized_at;
            $donation->inventory_id = $request->inventory_id;
            $donation->quantity = $request->quantity;
            $donation->cost = $request->cost;
            $donation->total = $request->total;
            $donation->save();
            $response = response()->json(200);
            Log::alert('Controller insertDonation. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json($catchError->getMessage());
            Log::error('Controller insertDonation. Error:'.$error);
            return $error;
        }
    }

    public function exportDonations(Request $request)
    {
        return Excel::download(new DonationsExport, 'donations.xlsx');
    }

    public function getDonation(Request $request)
    {
        $single = $this->queryGetDonationsTrait();
        if (isset($request->donationId)) {
            $single = $single->where('donations.id', $request->donationId);
        }
        $single = $single->first();
        return response()->json($single);
    }

    public function updateDonation(Request $request)
    {
        Log::info('Controller updateDonation. Request:'.$request);
        $this->validate($request, [
            'id' => ['required', 'integer'],
            'name' => ['required', 'max:255', 'min:1'],
            'realized_at' => ['required', 'date'],
            'inventory_id' => ['required', 'integer', 'exists:App\Models\Inventory,id'],
            'quantity' => ['required', 'numeric'],
            'cost' => ['required', 'numeric'],
            'total' => ['required', 'numeric']
        ]);
        try {
            $donation = Donation::find($request->id)//DonationObserver updating
            ->update([
                'name' => $request->name,
                'realized_at' => $request->realized_at,
                'inventory_id' => $request->inventory_id,
                'quantity' => $request->quantity,
                'cost' => $request->cost,
                'total' => $request->total
            ]);
            $response = response()->json(200);
            Log::alert('Controller updateDonation. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json($catchError->getMessage());
            Log::error('Controller updateDonation. Error:'.$error);
            return $error;
        }
    }
}
