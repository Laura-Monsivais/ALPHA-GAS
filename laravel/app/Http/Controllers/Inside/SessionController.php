<?php

namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\Session;
use App\Exports\SessionsExport;
use App\Traits\SessionTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class SessionController extends Controller
{
    use SessionTrait;
    /**
     * The name of the controller corresponding model.
     *
     * @var string
     */
    protected $model = Session::class;

    public function getSessions(Request $request)
    {
        $all = $this->queryGetSessionsTrait();
        /* Búsqueda avanzada A-Z */
        if (isset($request->authenticate)) {
            $all = $all->where('sessions.user_id', Auth::user()->id);
        }
        if (isset($request->clients)) {
            switch(Auth::user()->session->rol->key){
                case "Super":
                break;
                case "Director":
                    $all = $all->where('enterprises.id', Auth::user()->session->subsidiary->business->enterprise->id);
                break;
                case "Manager":
                    $all = $all->where('subsidiaries.id', Auth::user()->session->subsidiary_id);
                break;
                case "Call_Center":
                    $all = $all->where('subsidiaries.id', Auth::user()->session->subsidiary_id);
                break;
                case "Seller":
                    $all = $all->where('subsidiaries.id', Auth::user()->session->subsidiary_id);
                break;
                case "Client":
                    $all = $all->where('sessions.id', 0);
                break;
                default:
                    $all = $all->where('sessions.id', 0);
                break;
            }
            $all->whereIn('roles.key', ['Client']);
        }
        if(isset($request->limit)) {
            $all = $all->limit($request->limit);
        }       
        if (isset($request->search)) {
            $all = $all->where(function($query) use ($request) {
                $query->orWhere('users.name', 'like', '%' . $request->search . '%')
                ->orWhere('users.lastname1', 'like', '%' . $request->search . '%')
                ->orWhere('users.lastname2', 'like', '%' . $request->search . '%')
                ->orWhere('users.cellphone', 'like', '%' . $request->search . '%');
            });
        }
        if (isset($request->sellers)) {
            switch(Auth::user()->session->rol->key){
                case "Super":
                break;
                case "Director":
                    $all = $all->where('enterprises.id', Auth::user()->session->subsidiary->business->enterprise->id);
                break;
                case "Manager":
                    $all = $all->where('subsidiaries.id', Auth::user()->session->subsidiary_id);
                break;
                case "Call_Center":
                    $all = $all->where('subsidiaries.id', Auth::user()->session->subsidiary_id);
                break;
                case "Seller":
                    $all = $all->where('subsidiaries.id', Auth::user()->session->subsidiary_id);
                break;
                case "Client":
                    $all = $all->where('sessions.id', 0);
                break;
                default:
                    $all = $all->where('sessions.id', 0);
                break;
            }
            $all = $all->whereIn('roles.key', ['Seller']);
        }
        if (isset($request->subsidiary_id)) {
            $all = $all->where('sessions.subsidiary_id', $request->subsidiary_id);
        }
        if (isset($request->user_id)) {  
            $all = $all->where('sessions.user_id', $request->user_id);
        }
        /* Búsqueda avanzada A-Z */
        if (isset($request->id)) {
            $all = $all->where('session.id', $request->id);
            $all = $all->first();
        } else {
            $all = $all->get();            
        }
        return response()->json($all);
    }

    public function exportSessions(Request $request) 
    {
        return Excel::download(new SessionsExport, 'sessions.xlsx');
    }
}
