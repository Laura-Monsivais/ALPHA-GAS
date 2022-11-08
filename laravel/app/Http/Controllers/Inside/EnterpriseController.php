<?php

namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\Enterprise;
use App\Traits\EnterpriseTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class EnterpriseController extends Controller
{
    use EnterpriseTrait;
    /**
     * The name of the controller corresponding model.
     *
     * @var string
     */
    protected $model = Enterprise::class;

    public function getEnterprises(Request $request)
    {
        $all = $this->queryGetEnterprisesTrait();
        /* Búsqueda avanzada A-Z */
        if(isset($request->createdAtStart)) {
            $all = $all->where('enterprises.created_at', '>=', $request->createdAtStart);
        }
        if(isset($request->createdAtEnd)) {
            $all = $all->where('enterprises.created_at', '<=', $request->createdAtEnd);
        }
        if(isset($request->limit)) {
            $all = $all->limit($request->limit);
        }
        if(isset($request->name)) {
            $all = $all->where('enterprises.name', 'like', '%'.$request->name.'%');
        }
        /* Búsqueda avanzada A-Z */
        if (isset($request->id)) {
            $all = $all->where('enterprises.id', $request->id);
            $all = $all->first();
        } else {
            $all = $all->get();            
        }
        return response()->json($all);
    }  

    public function insertEnterprise(Request $request)
    {
        Log::info('Controller insertEnterprise. Request:'.$request);
        $requestEnterprise = json_decode($request->enterprise, true);
        $validator = Validator::make($requestEnterprise, [
            'name' => ['required', 'max:255', 'min:1']
        ]);
        if(!$validator->passes()){
            $validation = response()->json(['errors' => $validator->errors()->all(), 'message' => "The given data was invalid."], 422);
            Log::error('Controller insertEnterprise. Validation:'.$validation);
            return $validation;
        }
        try {
            $enterpriseId = Enterprise::insertGetId([
                'name' => $requestEnterprise['name']
            ]);
            $message = "Insertó empresa.";
            $enterpriseUpdate = array();
            if ($request->hasFile('logoForm')) {
                $logoName = $enterpriseId.'.'.$request->logoForm->extension();
                $request->logoForm->storeAs('enterprises/logos', $logoName, 'public');
                $enterpriseUpdate['logo'] =  $logoName;
                $message .= "Guardó logo.";
            }
            if ($request->hasFile('overlayForm')) {
                $overlayName = $enterpriseId.'.'.$request->overlayForm->extension();
                $request->overlayForm->storeAs('enterprises/overlays', $overlayName, 'public');
                $enterpriseUpdate['overlay'] =  $overlayName;
                $message .= "Guardó fondo.";
            }
            Enterprise::where('id', $enterpriseId)
            ->update($enterpriseUpdate);
            $response = response()->json(['status' => 200, 'message' => $message]);
            Log::alert('Controller insertEnterprise. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json(['status' => 500, 'message' => $catchError->getMessage()]);
            Log::error('Controller insertEnterprise. Error:'.$error);
            return $error;
        }
    } 

    public function updateEnterprise(Request $request)
    {
        Log::info('Controller updateEnterprise. Request:'.$request);
        $requestEnterprise = json_decode($request->enterprise, true);
        $validator = Validator::make($requestEnterprise, [
            'id' => ['required', 'integer'],
            'name' => ['required', 'max:255', 'min:1']
        ]);
        if(!$validator->passes()){
            $validation = response()->json(['errors' => $validator->errors()->all(), 'message' => "The given data was invalid."], 422);
            Log::error('Controller updateEnterprise. Validation:'.$validation);
            return $validation;
        }
        try {
            $enterpriseUpdate = array(
                'name' => $requestEnterprise['name']
            );
            $message = "Actualizó empresa.";
            if ($request->hasFile('logoForm')) {
                Storage::disk('public')->delete('enterprises/logos' . $requestEnterprise['logo']);
                $logoName = $requestEnterprise['id'].'.'.$request->logoForm->extension();
                $request->logoForm->storeAs('enterprises/logos', $logoName, 'public');
                $enterpriseUpdate['logo'] =  $logoName;
                $message .= "Guardó logo.";
            }
            if ($request->hasFile('overlayForm')) {
                Storage::disk('public')->delete('enterprises/overlays' . $requestEnterprise['overlay']);
                $overlayName = $requestEnterprise['id'].'.'.$request->overlayForm->extension();
                $request->overlayForm->storeAs('enterprises/overlays', $overlayName, 'public');
                $enterpriseUpdate['overlay'] =  $overlayName;
                $message .= "Guardó fondo.";
            }
            Enterprise::where('id', $requestEnterprise['id'])
            ->update($enterpriseUpdate);
            $response = response()->json(['status' => 200, 'message' => $message]);
            Log::alert('Controller updateEnterprise. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json(['status' => 500, 'message' => $catchError->getMessage()]);
            Log::error('Controller updateEnterprise. Error:'.$error);
            return $error;
        }
    }

    public function getEnterpriseLogo(Request $request) 
    {
        $response = $this->codeGetEnterpriseLogoTrait("inside", $request->logo);
        return $response;
    }
    
    public function downloadEnterpriseLogo(Request $request) 
    {
        Log::info('Controller downloadEnterpriseLogo. Request:'.$request);
        if (isset($request->logo)) {
            try {
                $response = Storage::download("public/enterprises/logos/".$request->logo);
                Log::alert('Controller downloadEnterpriseLogo. Response:'.$response);
                return $response;
            } catch (\Exception $e) {
                $error = Storage::download("public/enterprises/logos/default.png");
                Log::error('Controller downloadEnterpriseLogo. Error:'.$error);
                return $error;
            }
        } else {
            $error = Storage::download("public/enterprises/logos/default.png");
            Log::error('Controller downloadEnterpriseLogo. Error:'.$error);
            return $error;
        }
    }

    public function getEnterpriseOverlay(Request $request) 
    {
        Log::info('Controller getEnterpriseOverlay. Request:'.$overlay);
        if (isset($request->overlay)) {
            try {
                $response = Storage::response("public/enterprises/overlays/".$request->overlay);
                Log::alert('Controller getEnterpriseOverlay. Response:'.$response);
                return $response;
            } catch (\Exception $e) {
                $error = Storage::response("public/enterprises/overlays/default.jpg");
                Log::error('Controller getEnterpriseOverlay. Error:'.$error);
                return $error;
            }
        } else {
            $error = Storage::response("public/enterprises/overlay/default.jpg");
            Log::error('Controller getEnterpriseOverlay. Error:'.$error);
            return $error;
        }
    }
    
    public function downloadEnterpriseOverlay(Request $request) 
    {
        Log::info('Controller downloadEnterpriseOverlay. Request:'.$request);
        if (isset($request->overlay)) {
            try {
                $response = Storage::download("public/enterprises/overlays/".$request->overlay);
                Log::alert('Controller downloadEnterpriseOverlay. Response:'.$response);
                return $response;
            } catch (\Exception $e) {
                $error = Storage::download("public/enterprises/overlays/default.jpg");
                Log::error('Controller downloadEnterpriseOverlay. Error:'.$error);
                return $error;
            }
        } else {
            $error = Storage::download("public/enterprises/overlays/default.jpg");
            Log::error('Controller downloadEnterpriseOverlay. Error:'.$error);
            return $error;
        }
    }
}
