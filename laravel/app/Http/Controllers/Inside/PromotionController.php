<?php

namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\Promotion;
use App\Exports\PromotionsExport;
use App\Traits\PromotionTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class PromotionController extends Controller
{
    use PromotionTrait;
    /**
     * The name of the controller corresponding model.
     *
     * @var string
     */
    protected $model = Promotion::class;

    public function getPromotions(Request $request)
    {
        $all = $this->queryGetPromotionsTrait();
        /* Búsqueda avanzada A-Z */
        if(isset($request->business_id)) {
            $all = $all->where('promotions.business_id', $request->business_id);
        }
        if (isset($request->cost)) {
            $all = $all->where('promotions.cost', 'like', '%' . $request->cost . '%');
        }        
        if(isset($request->createdAtStart)) {
            $all = $all->where('promotions.created_at', '>=', $request->createdAtStart);
        }
        if(isset($request->createdAtEnd)) {
            $all = $all->where('promotions.created_at', '<=', $request->createdAtEnd);
        }
        if(isset($request->enterprise_id)) {
            $all = $all->where('promotions.enterprise_id', $request->enterprise_id);
        }
        if(isset($request->expiresAtStart)) {
            $all = $all->where('promotions.expires_at', '>=', $request->expiresAtStart);
        }
        if(isset($request->expiresAtEnd)) {
            $all = $all->where('promotions.expires_at', '<=', $request->expiresAtEnd);
        }
        if(isset($request->limit)) {
            $all = $all->limit($request->limit);
        }      
        if (isset($request->name)) {
            $all = $all->where('promotions.name', 'like', '%' . $request->name . '%');
        }
        if (isset($request->price)) {
            $all = $all->where('promotions.price', 'like', '%' . $request->price . '%');
        }
        if (isset($request->search)) {
            $all = $all->where(function($query) use ($request) {
                $query->orWhere('promotions.cost', 'like', '%' . $request->search . '%')
                ->orWhere('promotions.expires_at', 'like', '%' . $request->search . '%')
                ->orWhere('promotions.name', 'like', '%' . $request->search . '%')
                ->orWhere('promotions.price', 'like', '%' . $request->search . '%');
            });
        }   
        if(isset($request->subsidiary_id)) {
            $all = $all->where('promotions.subsidiary_id', $request->subsidiary_id);
        }
        /* Búsqueda avanzada A-Z */
        if (isset($request->id)) {
            $all = $all->where('promotions.id', $request->id);
            $all = $all->first();
        } else {
            $all = $all->get();            
        }
        return response()->json($all);
    }

    public function insertPromotion(Request $request)
    {
        Log::info('Controller insertPromotion. Request:'.$request);
        $this->validate($request, [
            'name' => ['required', 'max:255', 'min:1'],
            'price' => ['required', 'numeric'],
            'cost' => ['required', 'numeric'],
            'expires_at' => ['required', 'date', 'after:today'],
            'enterprise_id' => ['required', 'integer', 'exists:App\Models\Enterprise,id']
        ]);
        try {
            Promotion::insert([
                'name' => $request->name,
                'expires_at' => $request->expires_at,
                'price' => $request->price,
                'cost' => $request->cost,
                'enterprise_id' => $request->enterprise_id,
                'business_id' => ($request->business_id != 0) ? $request->business_id : NULL,
                'subsidiary_id' => ($request->subsidiary_id != 0) ? $request->subsidiary_id : NULL
            ]);
            $response = response()->json(200);
            Log::alert('Controller insertPromotion. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json($catchError->getMessage());
            Log::error('Controller insertPromotion. Error:'.$error);
            return $error;
        }
    }
    
    public function exportPromotions(Request $request) 
    {
        return Excel::download(new PromotionsExport, 'promotions.xlsx');
    }

    public function updatePromotion(Request $request)
    {
        Log::info('Controller updatePromotion. Request:'.$request);
        $this->validate($request, [
            'id' => ['required', 'integer'],
            'name' => ['required', 'max:255', 'min:1'],
            'price' => ['required', 'numeric'],
            'cost' => ['required', 'numeric'],
            'expires_at' => ['required', 'date', 'after:today'],
            'enterprise_id' => ['required', 'integer', 'exists:App\Models\Enterprise,id']
        ]);
        try {
            Promotion::where('id', $request->id)
                ->update([
                    'name' => $request->name,
                    'expires_at' => $request->expires_at,
                    'price' => $request->price,
                    'cost' => $request->cost,
                    'enterprise_id' => $request->enterprise_id,
                    'business_id' => ($request->business_id != 0) ? $request->business_id : NULL,
                    'subsidiary_id' => ($request->subsidiary_id != 0) ? $request->subsidiary_id : NULL
                ]);
            $response = response()->json(200);
            Log::alert('Controller updatePromotion. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json($catchError->getMessage());
            Log::error('Controller updatePromotion. Error:'.$error);
            return $error;
        }
    }
}
