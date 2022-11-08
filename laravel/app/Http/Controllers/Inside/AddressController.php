<?php
namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\Address;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AddressController extends Controller
{
    /**
     * The name of the controller corresponding model.
     *
     * @var string
     */
    protected $model = Address::class;

    public function getAddresses(Request $request) {
        $all = Address::select('addresses.id', 
            'addresses.name',
            'addresses.street',
            'addresses.exterior',
            'addresses.interior',
            'addresses.postal_code',
            'addresses.neighborhood',
            'addresses.city',
            'addresses.municipality',
            'addresses.state',
            'addresses.country',
            'addresses.references',
            DB::raw('CONCAT(users.name, " ", users.lastname1, " ", IFNULL(users.lastname2, "")) AS clientNameComplete'),
            'addresses.created_at', 
            'addresses.updated_at')
        ->whereNull('addresses.deleted_at')        
        ->join('sessions', 'sessions.id', 'addresses.client_id')
        ->join('users', 'users.id', 'sessions.user_id');
        if(isset($request->authenticate)){
            $all = $all->where('addresses.client_id', Auth::user()->session_id);
        }
        if(isset($request->sessionId)){
            $all = $all->where('addresses.client_id', $request->sessionId);
        }      
        if (isset($request->id)) {
            $all = $all->where('addresses.id', $request->id);
            $all = $all->first();
        } else {
            $all = $all->get();            
        }
        return response()->json($all);
    }

    public function insertAddress(Request $request)
    {
        Log::info('Controller insertAddress. Request:'.$request);
        $this->validate($request, [
            'name' => ['required', 'max:255', 'min:1'],
            'street' => ['required', 'max:255', 'min:1'],
            'exterior' => ['required', 'max:255', 'min:1'],
            'postal_code' => ['required', 'max:255', 'min:1'],
            'neighborhood' => ['required', 'max:255', 'min:1'],
            'city' => ['required', 'max:255', 'min:1'],
            'municipality' => ['required', 'max:255', 'min:1'],
            'state' => ['required', 'max:255', 'min:1'],
            'country' => ['required', 'max:255', 'min:1']
        ]);
        try {
            Address::insert([
                'name' => $request->name,
                'street' => $request->street,
                'exterior' => $request->exterior,
                'interior' => $request->interior,
                'postal_code' => $request->postal_code,
                'neighborhood' => $request->neighborhood,
                'city' => $request->city,
                'municipality' => $request->municipality,
                'state' => $request->state,
                'country' => $request->country,
                'references' => $request->references,
                'client_id' => Auth::user()->session_id/** * @todo cambiar a request */ 
            ]);
            $response = response()->json(200);
            Log::alert('Controller insertAddress. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json($catchError->getMessage());
            Log::error('Controller insertAddress. Error:'.$error);
            return $error;
        }
    }

}