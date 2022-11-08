<?php

namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\RouteType;
use App\Exports\RouteTypeExport;
use App\Traits\RouteTypeTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class RouteTypeController extends Controller
{
    use RouteTypeTrait;
    /**
     * The name of the controller corresponding model.
     *
     * @var string
     */
    protected $model = RouteType::class;

    public function getRouteTypes(Request $request)
    {
        $all = $this->queryGetRouteTypeTrait();
        /* Búsqueda avanzada A-Z */    
        if(isset($request->limit)) {
            $all = $all->limit($request->limit);
        }      
        if (isset($request->name)) {
            $all = $all->where('route_types.name', 'like', '%' . $request->name . '%');
        }
        if (isset($request->search)) {
            $all = $all->where(function($query) use ($request) {
                $query->orWhere('route_types.name', 'like', '%' . $request->search . '%')
                ->orWhere('route_types.update_meter', 'like', '%' . $request->search . '%');
            });
        }   
        /* Búsqueda avanzada A-Z */    
        if (isset($request->id)) {
            $all = $all->where('route_types.id', $request->id);
            $all = $all->first();
        } else {
            $all = $all->get();            
        }
        return response()->json($all);
    }
}
