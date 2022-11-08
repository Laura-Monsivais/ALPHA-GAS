<?php

namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\Rol;
use App\Traits\RolTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class RolController extends Controller
{
    use RolTrait;
    /**
     * The name of the controller corresponding model.
     *
     * @var string
     */
    protected $model = Rol::class;

    public function getRoles(Request $request)
    {
        $all = $this->queryGetRolesTrait();
        if (isset($request->id)) {
            $all = $all->where('roles.id', $request->id);
            $all = $all->first();
        } else {
            $all = $all->get();            
        }
        return response()->json($all);
    }

    public function getRolManual($manual = null) 
    {
        Log::info('Controller getRolManual. Request:'.$manual);
        if (isset($manual)) {
            try {
                $response = Storage::response("public/roles/manuals/".$manual);
                Log::alert('Controller getRolManual. Response:'.$response);
                return $response;
            } catch (\Exception $e) {
                $error = Storage::response("public/roles/manuals/default.png");
                Log::error('Controller getRolManual. Error:'.$error);
                return $error;
            }
        } else {
            $error = Storage::response("public/roles/manuals/default.png");
            Log::error('Controller getRolManual. Error:'.$error);
            return $error;
        }
    }
    
    public function downloadRolManual(Request $request) 
    {
        Log::info('Controller downloadRolManual. Request:'.$request);
        if (isset($request->manual)) {
            try {
                $response = Storage::download("public/roles/manuals/".$request->manual);
                Log::alert('Controller downloadRolManual. Response:'.$response);
                return $response;
            } catch (\Exception $e) {
                $error = Storage::download("public/roles/manuals/default.png");
                Log::error('Controller downloadRolManual. Error:'.$error);
                return $error;
            }
        } else {
            $error = Storage::download("public/roles/manuals/default.png");
            Log::error('Controller downloadRolManual. Error:'.$error);
            return $error;
        }
    }
}
