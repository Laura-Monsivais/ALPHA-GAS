<?php
namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\Route;
use App\Models\RoutePlace;
use App\Exports\RouteExport;
use App\Traits\RouteTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class RouteController extends Controller
{
    use RouteTrait;
    /**
     * The name of the controller corresponding model.
     *
     * @var string
     */
    protected $model = Route::class;

    public function getRoutes(Request $request)
    {
        $all = $this->queryGetRoutesTrait();
        /* Búsqueda avanzada A-Z */
        if(isset($request->businessId)) {
            $all = $all->where('businesses.id', $request->businessId);
        }
        if(isset($request->cellphone)) {
            $all = $all->where('routes.cellphone', $request->cellphone);
        }
        if(isset($request->createdAtStart)) {
            $all = $all->where('routes.created_at', '>=', $request->createdAtStart);
        }
        if(isset($request->createdAtEnd)) {
            $all = $all->where('routes.created_at', '<=', $request->createdAtEnd);
        }
        if(isset($request->enterpriseId)) {
            $all = $all->where('enterprises.id', $request->enterpriseId);
        }
        if(isset($request->maximum_capacity)) {
            $all = $all->where('routes.maximum_capacity', $request->maximum_capacity);
        }
        if(isset($request->minimum_capacity)) {
            $all = $all->where('routes.minimum_capacity', $request->minimum_capacity);
        }
        if(isset($request->limit)) {
            $all = $all->limit($request->limit);
        }     
        if (isset($request->name)) {
            $all = $all->where('routes.name', 'like', '%' . $request->name . '%');
        }
        if(isset($request->route_type_id)) {
            $all = $all->where('routes.route_type_id', $request->route_type_id);
        }
        if(isset($request->seller_id)) {
            $all = $all->where('routes.seller_id', $request->seller_id);
        }
        if(isset($request->subsidiaryId)) {
            $all = $all->where('subsidiaries.id', $request->subsidiaryId);
        }
        /* Búsqueda avanzada A-Z */
        if (isset($request->id)) {
            $all = $all->where('routes.id', $request->id);
            $all = $all->first();
        } else {
            $all = $all->get();            
        }
        return response()->json($all);
    }

    public function insertRoute(Request $request)
    {
        Log::info('Controller insertRoute. Request:'.$request);
        $this->validate($request, [
            'name' => ['required', 'max:255', 'min:1'],
            'route_type_id' => ['required', 'integer', 'exists:App\Models\RouteType,id'],
            'maximum_capacity' => ['required', 'numeric'],
            'minimum_capacity' => ['required', 'numeric'],
            'seller_id' => ['required', 'integer', 'exists:App\Models\Session,id'],
            'cellphone' => ['required', 'numeric']
        ]);
        try {
            $routeId = Route::insertGetId([
                'name' => $request->name,
                'route_type_id' => $request->route_type_id,
                'maximum_capacity' => $request->maximum_capacity,
                'minimum_capacity' => $request->minimum_capacity,
                'seller_id' => $request->seller_id,
                'cellphone' => $request->cellphone
            ]);
            foreach ($request['routePlaces'] as $routePlace) {
                RoutePlace::insert([
                    'route_id' => $routeId,
                    'postal_code' => $routePlace['postal_code'],
                    'neighborhood' => $routePlace['neighborhood'],
                    'city' => $routePlace['city'],
                    'municipality' => $routePlace['municipality'],
                    'state' => $routePlace['state'],
                    'country' => $routePlace['country']
                ]);
            }
            $response = response()->json(200);
            Log::alert('Controller insertRoute. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json($catchError->getMessage());
            Log::error('Controller insertRoute. Error:'.$error);
            return $error;
        }
    }
    
    public function exportRoutes(Request $request) 
    {
        return Excel::download(new RouteExport, 'routes.xlsx');
    }

    public function updateRoute(Request $request)
    {
        Log::info('Controller updateRoute. Request:'.$request);
        $this->validate($request, [
            'id' => ['required', 'integer'],
            'name' => ['required', 'max:255', 'min:1'],
            'route_type_id' => ['required', 'integer', 'exists:App\Models\RouteType,id'],
            'maximum_capacity' => ['required', 'numeric'],
            'minimum_capacity' => ['required', 'numeric'],
            'seller_id' => ['required', 'integer', 'exists:App\Models\Session,id'],
            'cellphone' => ['required', 'numeric']
        ]);
        try {
            Route::where('id', $request->id)
            ->update([
                'name' => $request->name,
                'route_type_id' => $request->route_type_id,
                'maximum_capacity' => $request->maximum_capacity,
                'minimum_capacity' => $request->minimum_capacity,
                'seller_id' => $request->seller_id,
                'cellphone' => $request->cellphone
            ]);            
            $routePlaces = RoutePlace::where('route_id', $request->id)->get();
            foreach ($routePlaces as $routePlace) {
                RoutePlace::where('id', $routePlace['id'])
                ->update(['deleted_at' => Carbon::now()]);
            }            
            foreach ($request['routePlaces'] as $routePlace) {
                if (isset($routePlace['id'])) {
                    RoutePlace::where('id', $routePlace['id'])
                    ->update([
                        'route_id' => $routeId,
                        'postal_code' => $routePlace['postal_code'],
                        'neighborhood' => $routePlace['neighborhood'],
                        'city' => $routePlace['city'],
                        'municipality' => $routePlace['municipality'],
                        'state' => $routePlace['state'],
                        'country' => $routePlace['country'],
                        'deleted_at' => NULL
                    ]);
                } else {                    
                    $routePlaceUnique = RoutePlace::where('route_id', $request->id)
                    ->where('postal_code', $routePlace['postal_code'])
                    ->where('neighborhood', $routePlace['neighborhood'])
                    ->where('city', $routePlace['city'])
                    ->where('municipality', $routePlace['municipality'])
                    ->where('state', $routePlace['state'])
                    ->where('country', $routePlace['country'])
                    ->first();
                    if (isset($routePlaceUnique->id)) {
                        RoutePlace::where('id', $routePlaceUnique->id)
                        ->update([
                            'postal_code' => $routePlace['postal_code'],
                            'neighborhood' => $routePlace['neighborhood'],
                            'city' => $routePlace['city'],
                            'municipality' => $routePlace['municipality'],
                            'state' => $routePlace['state'],
                            'country' => $routePlace['country'],
                            'deleted_at' => NULL
                        ]);
                    } else {
                        RoutePlace::insert([
                            'route_id' => $request->id,
                            'postal_code' => $routePlace['postal_code'],
                            'neighborhood' => $routePlace['neighborhood'],
                            'city' => $routePlace['city'],
                            'municipality' => $routePlace['municipality'],
                            'state' => $routePlace['state'],
                            'country' => $routePlace['country']
                        ]);
                    }
                }
            }
            $response = response()->json(200);
            Log::alert('Controller updateRoute. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json($catchError->getMessage());
            Log::error('Controller updateRoute. Error:'.$error);
            return $error;
        }
    }
}
