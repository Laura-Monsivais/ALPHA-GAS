<?php
namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Exports\BusinessesExport;
use App\Traits\BusinessTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class BusinessController extends Controller
{
    use BusinessTrait;
    /**
     * The name of the controller corresponding model.
     *
     * @var string
     */
    protected $model = Business::class;

    public function getBusinesses(Request $request) {
        $all = $this->queryGetBusinessesTrait();
        /* Búsqueda avanzada A-Z */    
        if(isset($request->createdAtStart)) {
            $all = $all->where('businesses.created_at', '>=', $request->createdAtStart);
        }
        if(isset($request->createdAtEnd)) {
            $all = $all->where('businesses.created_at', '<=', $request->createdAtEnd);
        }
        if(isset($request->attention_id)){      
            $all = $all->where('businesses.attention_id', $request->attention_id);
        } 
        if(isset($request->enterprise_id)){       
            $all = $all->where('businesses.enterprise_id', $request->enterprise_id);
        } 
        if(isset($request->limit)) {
            $all = $all->limit($request->limit);
        }      
        if (isset($request->search)) {
            $all = $all->where(function($query) use ($request) {
                $query->orWhere('businesses.name', 'like', '%' . $request->search . '%');
            });
        }         
        /* Búsqueda avanzada A-Z */
        if (isset($request->id)) {
            $all = $all->where('businesses.id', $request->id);
            $all = $all->first();
        } else {
            $all = $all->get();            
        }
        return response()->json($all);
    }

    public function insertBusiness(Request $request)
    {
        Log::info('Controller insertBusiness. Request:'.$request);
        $this->validate($request, [
            'name' => ['required', 'max:255', 'min:1'],
            'attention_id' => ['required', 'integer', 'exists:App\Models\Attention,id']
        ]);
        try {
            Business::insert([
                'name' => $request->name,
                'enterprise_id' => $request->enterprise_id,
                'attention_id' => $request->attention_id
            ]);
            $response = response()->json(200);
            Log::alert('Controller insertBusiness. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json($catchError->getMessage());
            Log::error('Controller insertBusiness. Error:'.$error);
            return $error;
        }
    }
    
    public function exportBusinesses(Request $request) 
    {
        return Excel::download(new BusinessesExport, 'businesses.xlsx');
    }

    public function updateBusiness(Request $request)
    {
        Log::info('Controller updateBusiness. Request:'.$request);
        $this->validate($request, [
            'name' => ['required', 'max:255', 'min:1'],
            'attention_id' => ['required', 'integer', 'exists:App\Models\Attention,id']
        ]);
        try {
            Business::where('id', $request->id)
            ->update([
                'name' => $request->name,
                'enterprise_id' => $request->enterprise_id,
                'attention_id' => $request->attention_id
            ]);
            $response = response()->json(200);
            Log::alert('Controller updateBusiness. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json($catchError->getMessage());
            Log::error('Controller updateBusiness. Error:'.$error);
            return $error;
        }
    }

}