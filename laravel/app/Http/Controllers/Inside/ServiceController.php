<?php

namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Exports\ServiceExport;
use App\Traits\ServiceTrait;
use Maatwebsite\Excel\Facades\Excel;

class ServiceController extends Controller
{
    use ServiceTrait;
    /**
     * The name of the controller corresponding model.
     *
     * @var string
     */
    protected $model = Service::class;

    public function getServices(Request $request)
    {
        $all = $this->queryGetServiceTrait();
        /* Búsqueda avanzada A-Z */
        if(isset($request->cost)) {
            $all = $all->where('services.cost', 'like', '%'.$request->cost.'%');
        }
        if(isset($request->createdAtStart)) {
            $all = $all->where('services.created_at', '>=', $request->createdAtStart);
        }
        if(isset($request->createdAtEnd)) {
            $all = $all->where('services.created_at', '<=', $request->createdAtEnd);
        }
        if(isset($request->description)) {
            $all = $all->where('services.description', 'like', '%'.$request->description.'%');
        }
        if (isset($request->enterprise_id)) {
            $all = $all->where('services.enterprise_id', $request->enterprise_id);
        }
        if(isset($request->limit)) {
            $all = $all->limit($request->limit);
        }
        if(isset($request->name)) {
            $all = $all->where('services.name', 'like', '%'.$request->name.'%');
        }
        if(isset($request->price)) {
            $all = $all->where('services.price', 'like', '%'.$request->price.'%');
        }
        if (isset($request->search)) {
            $all = $all->where(function($query) use ($request) {
                $query->orWhere('services.cost', 'like', '%' . $request->search . '%')
                ->orWhere('services.description', 'like', '%' . $request->search . '%')
                ->orWhere('services.name', 'like', '%' . $request->search . '%') 
                ->orWhere('services.price', 'like', '%' . $request->search . '%')                
                ->orWhere('enterprise.name', 'like', '%'.$request->search.'%');
            });
        }
        /* Búsqueda avanzada A-Z */
        if (isset($request->id)) {
            $all = $all->where('services.id', $request->id);
            $all = $all->first();
        } else {
            $all = $all->get();            
        }
        return response()->json($all);
    }

    public function insertService(Request $request)
    {
        Log::info('Controller insertService. Request:'.$request);
        $this->validate($request, [
            'name' => ['required', 'max:255', 'min:1'],
            'cost' => ['required', 'numeric'],
            'price' => ['required', 'numeric'],
            'enterprise_id' => ['required', 'integer', 'exists:App\Models\Enterprise,id']
        ]);
        try {
            Service::insert([
                'name' => $request->name,
                'description' => $request->description,
                'cost' => $request->cost,
                'price' => $request->price,
                'enterprise_id' => $request->enterprise_id
            ]);
            $response = response()->json(200);
            Log::alert('Controller insertService. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json($catchError->getMessage());
            Log::error('Controller insertService. Error:'.$error);
            return $error;
        }
    }
    
    public function updateService(Request $request)
    {
        Log::info('Controller updateService. Request:'.$request);
        $this->validate($request, [
            'id' => ['required', 'integer'],
            'name' => ['required', 'max:255', 'min:1'],
            'cost' => ['required', 'numeric'],
            'price' => ['required', 'numeric'],
            'enterprise_id' => ['required', 'integer', 'exists:App\Models\Enterprise,id']
        ]);
        try {
            Service::where('id', $request->id)
            ->update([
                'name' => $request->name,
                'description' => $request->description,
                'cost' => $request->cost,
                'price' => $request->price,
                'enterprise_id' => $request->enterprise_id
            ]);
            $response = response()->json(200);
            Log::alert('Controller updateService. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json($catchError->getMessage());
            Log::error('Controller updateService. Error:'.$error);
            return $error;
        }
    }
    public function exportServices(Request $request) 
    {
        return Excel::download(new ServiceExport, 'services.xlsx');
    }
}
