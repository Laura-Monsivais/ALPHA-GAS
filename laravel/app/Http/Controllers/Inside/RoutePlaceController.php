<?php
namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\RoutePlace;
use App\Traits\RoutePlaceTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class RoutePlaceController extends Controller
{
    use RoutePlaceTrait;
    /**
     * The name of the controller corresponding model.
     *
     * @var string
     */
    protected $model = RoutePlace::class;

    public function getRoutePlaces(Request $request)
    {
        $all = $this->queryGetRoutePlacesTrait();
        /* Búsqueda avanzada A-Z */    
        if(isset($request->limit)) {
            $all = $all->limit($request->limit);
        }      
        if (isset($request->route_id)) {
            $all = $all->where('route_places.route_id', $request->route_id);
        }
        if (isset($request->search)) {
            $all = $all->where(function($query) use ($request) {
                $query->orWhere('route_places.country', 'like', '%' . $request->search . '%')                
                ->orWhere('route_places.state', 'like', '%' . $request->search . '%')
                ->orWhere('route_places.municipality', 'like', '%' . $request->search . '%')
                ->orWhere('route_places.city', 'like', '%' . $request->search . '%')
                ->orWhere('route_places.postal_code', 'like', '%' . $request->search . '%')
                ->orWhere('route_places.neighborhood', 'like', '%' . $request->search . '%');
            });
        }  
        /* Búsqueda avanzada A-Z */  
        if (isset($request->id)) {
            $all = $all->where('route_places.id', $request->id);
            $all = $all->first();
        } else {
            $all = $all->get();            
        }
        return response()->json($all);
    }
}
