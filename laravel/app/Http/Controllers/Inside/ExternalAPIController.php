<?php
namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\ExternalApi;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Exports\ExternalApisExport;
use App\Traits\ExternalApiTrait;
use Maatwebsite\Excel\Facades\Excel;

class ExternalAPIController extends Controller

{        use ExternalApiTrait;
    /**
     * The name of the controller corresponding model.
     *
     * @var string
     */
    protected $model = ExternalApi::class;

    public function getExternalApis(Request $request) {
        $all = $this->queryGetExternalApisTrait();
        /* Búsqueda avanzada A-Z */ 
        if(isset($request->createdAtStart)) {
            $all = $all->where('external_apis.created_at', '>=', $request->createdAtStart);
        }
        if(isset($request->createdAtEnd)) {
            $all = $all->where('external_apis.created_at', '<=', $request->createdAtEnd);
        }
        if (isset($request->enterprise_id)) {
            $all = $all->where('external_apis.enterprise_id', $request->enterprise_id);
        }   
        if(isset($request->limit)) {
            $all = $all->limit($request->limit);
        }
        if(isset($request->method)) {
            $all = $all->where('external_apis.method', 'like', '%'.$request->method.'%');
        }
        if(isset($request->token)) {
            $all = $all->where('external_apis.token', 'like', '%'.$request->token.'%');
        }
        if(isset($request->url)) {
            $all = $all->where('external_apis.url', 'like', '%'.$request->url.'%');
        }
        /* Búsqueda avanzada A-Z */    
        if (isset($request->id)) {
            $all = $all->where('external_apis.id', $request->id);
            $all = $all->first();
        } else {
            $all = $all->get();            
        }
        return response()->json($all);
    }

    public function insertExternalApi(Request $request) {
        Log::info('Controller insertExternalApi. Request:'.$request);
        $this->validate($request, [
            'function' => ['required', 'max:255', 'min:1'],
            'url' => ['required', 'max:255', 'min:1', 'active_url'],
            'method' => ['required', 'max:255', 'min:1'],
            'token' => ['required', 'max:255', 'min:1'],
            'function' => ['required', 'max:255', 'min:1'],
            'enterprise_id' => ['required', 'integer', 'exists:App\Models\Enterprise,id']
        ]);
        try {
            ExternalApi::insert(['function' => $request->function,
                'url' => $request->url,
                'method' => $request->method,
                'token' => $request->token,
                'function' => $request->function,
                'enterprise_id' => $request->enterprise_id
            ]);
            $response = response()->json(200);
            Log::alert('Controller insertExternalApi. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json($catchError->getMessage());
            Log::error('Controller insertExternalApi. Error:'.$error);
            return $error;
        }
    }
    
    public function exportExternalApis(Request $request) 
    {
        return Excel::download(new ExternalApisExport, 'ExternalApis.xlsx');
    }

    public function updateExternalApi(Request $request) {
        Log::info('Controller updateExternalApi. Request:'.$request);
        $this->validate($request, [
            'id' => ['required', 'max:255', 'min:1'],
            'function' => ['required', 'max:255', 'min:1'],
            'url' => ['required', 'max:255', 'min:1'],
            'method' => ['required', 'max:255', 'min:1'],
            'token' => ['required', 'max:255', 'min:1'],
            'enterprise_id' => ['required', 'integer', 'exists:App\Models\Enterprise,id']
        ]);
        try {
            ExternalApi::where('id', $request->id)
            ->update(['function' => $request->function,
                'url' => $request->url,
                'method' => $request->method,
                'token' => $request->token,
                'enterprise_id' => $request->enterprise_id
            ]);
            $response = response()->json(200);
            Log::alert('Controller updateExternalApi. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json($catchError->getMessage());
            Log::error('Controller updateExternalApi. Error:'.$error);
            return $error;
        }
    }

    public function rechargeCellphone(Request $request) {
        Log::info('Controller rechargeCellphone. Request:'.$request);
        $single = ExternalApi::select('external_apis.id', 
            'external_apis.function',
            'external_apis.url',
            'external_apis.method',
            'external_apis.token',
            'enterprises.name AS enterpriseName',
            'external_apis.created_at', 
            'external_apis.updated_at')
        ->whereNull('external_apis.deleted_at')        
        ->join('enterprises', 'enterprises.id', 'external_apis.enterprise_id')
        ->where('external_apis.function', "rechargeCellphone")
        ->where('external_apis.enterprise_id',  Auth::user()->session->subsidiary->business->enterprise->id);
        $single = $single->first();
        $url = $single->url;
        $method = $single->method;
        $token = $single->token;
        $cellphone = $request->cellphone;
        $quantity = $request->quantity;
        $curl = curl_init();        
        curl_setopt_array($curl, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_HTTPHEADER => array(
                "authorization: Bearer ".$token,
                "cache-control: no-cache",
                "content-type: application/json"
            ),
            CURLOPT_POSTFIELDS => json_encode([
                'cellphone' => $cellphone,
                'quantity' => $quantity          
            ])
        ));
        $jsonResponse = curl_exec($curl);
        $curlError = curl_error($curl);
        curl_close($curl);
        if (empty($curlError)) {
            $message = json_decode($jsonResponse, true);
            $response = response()->json(['status' => 200, 'message' => $message]);
            Log::alert('Controller rechargeCellphone. Response:'.$response);
            return $response;
        } else {
            $error = response()->json(['status' => 500, 'message' => $curlError]);
            Log::error('Controller rechargeCellphone. Error:'.$error);
            return $error;
        }
    }
    public function payCFE(Request $request) {
        Log::info('Controller payCFE. Request:'.$request);
        $single = ExternalApi::select('external_apis.id', 
            'external_apis.function',
            'external_apis.url',
            'external_apis.method',
            'external_apis.token',
            'enterprises.name AS enterpriseName',
            'external_apis.created_at', 
            'external_apis.updated_at')
        ->whereNull('external_apis.deleted_at')        
        ->join('enterprises', 'enterprises.id', 'external_apis.enterprise_id')
        ->where('external_apis.function', "payCFE")
        ->where('external_apis.enterprise_id',  Auth::user()->session->subsidiary->business->enterprise->id);
        $single = $single->first();
        $url = $single->url;
        $method = $single->method;
        $token = $single->token;
        $agreement = $request->agreement;
        $reference = $request->reference;
        $amount = $request->amount;
        $curl = curl_init();        
        curl_setopt_array($curl, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_HTTPHEADER => array(
                "authorization: Bearer ".$token,
                "cache-control: no-cache",
                "content-type: application/json"
            ),
            CURLOPT_POSTFIELDS => json_encode([
                'agreement' => $agreement,
                'reference' => $reference ,
                'amount' => $amount,      
            ])
        ));
        $jsonResponse = curl_exec($curl);
        $curlError = curl_error($curl);
        curl_close($curl);
        if (empty($curlError)) {
            $message = json_decode($jsonResponse, true);
            $response = response()->json(['status' => 200, 'message' => $message]);
            Log::alert('Controller payCFE. Response:'.$response);
            return $response;
        } else {
            $error = response()->json(['status' => 500, 'message' => $curlError]);
            Log::error('Controller payCFE. Error:'.$error);
            return $error;
        }
    }
    public function payTELMEX(Request $request) {
        Log::info('Controller payTELMEX. Request:'.$request);
        $single = ExternalApi::select('external_apis.id', 
            'external_apis.function',
            'external_apis.url',
            'external_apis.method',
            'external_apis.token',
            'enterprises.name AS enterpriseName',
            'external_apis.created_at', 
            'external_apis.updated_at')
        ->whereNull('external_apis.deleted_at')        
        ->join('enterprises', 'enterprises.id', 'external_apis.enterprise_id')
        ->where('external_apis.function', "payTELMEX")
        ->where('external_apis.enterprise_id',  Auth::user()->session->subsidiary->business->enterprise->id);
        $single = $single->first();
        $url = $single->url;
        $method = $single->method;
        $token = $single->token;
        $agreement = $request->agreement;
        $reference = $request->reference;
        $amount = $request->amount;
        $curl = curl_init();        
        curl_setopt_array($curl, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_HTTPHEADER => array(
                "authorization: Bearer ".$token,
                "cache-control: no-cache",
                "content-type: application/json"
            ),
            CURLOPT_POSTFIELDS => json_encode([
                'agreement' => $agreement,
                'reference' => $reference ,
                'amount' => $amount,         
            ])
        ));
        $jsonResponse = curl_exec($curl);
        $curlError = curl_error($curl);
        curl_close($curl);
        if (empty($curlError)) {
            $message = json_decode($jsonResponse, true);
            $response = response()->json(['status' => 200, 'message' => $message]);
            Log::alert('Controller payTELMEX. Response:'.$response);
            return $response;
        } else {
            $error = response()->json(['status' => 500, 'message' => $curlError]);
            Log::error('Controller payTELMEX. Error:'.$error);
            return $error;
        }
    }
}