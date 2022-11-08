<?php

namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\Subsidiary;
use App\Traits\SubsidiaryTrait;
use App\Exports\SubsidiariesExport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Validator;

class SubsidiaryController extends Controller
{
    use SubsidiaryTrait;
    /**
     * The name of the controller corresponding model.
     *
     * @var string
     */
    protected $model = Subsidiary::class;

    public function getSubsidiaries(Request $request)
    {
        $all = $this->queryGetSubsidiariesTrait();
        /* Búsqueda avanzada A-Z */
        if (isset($request->business_id)) {
            $all = $all->where('subsidiaries.business_id', $request->business_id);
        }
        if (isset($request->city)) {
            $all = $all->where('subsidiaries.city', 'like', '%' . $request->city . '%');
        }
        if (isset($request->country)) {
            $all = $all->where('subsidiaries.country', 'like', '%' . $request->country . '%');
        }
        if(isset($request->createdAtStart)) {
            $all = $all->where('subsidiaries.created_at', '>=', $request->createdAtStart);
        }
        if(isset($request->createdAtEnd)) {
            $all = $all->where('subsidiaries.created_at', '<=', $request->createdAtEnd);
        }
        if (isset($request->enterpriseId)) {
            $all = $all->where('enterprises.id', $request->enterpriseId);
        }
        if (isset($request->exterior)) {
            $all = $all->where('subsidiaries.exterior', 'like', '%' . $request->exterior . '%');
        }
        if (isset($request->interior)) {
            $all = $all->where('subsidiaries.interior', 'like', '%' . $request->interior . '%');
        }
        if (isset($request->is_central)) {
            if ($request->is_central) {
                $all = $all->where('subsidiaries.is_central', '=', 1);
            } else {
                $all = $all->where('subsidiaries.is_central', '=', 0);
            }
        }
        if (isset($request->postal_code)) {
            $all = $all->where('subsidiaries.postal_code', 'like', '%' . $request->postal_code . '%');
        }
        if (isset($request->limit)) {
            $all = $all->limit($request->limit);
        }
        if (isset($request->municipality)) {
            $all = $all->where('subsidiaries.municipality', 'like', '%' . $request->municipality . '%');
        }
        if (isset($request->name)) {
            $all = $all->where('subsidiaries.name', 'like', '%' . $request->name . '%');
        }
        if (isset($request->neighborhood)) {
            $all = $all->where('subsidiaries.neighborhood', 'like', '%' . $request->neighborhood . '%');
        }
        if (isset($request->references)) {
            $all = $all->where('subsidiaries.references', 'like', '%' . $request->references . '%');
        }
        if (isset($request->search)) {
            $all = $all->where(function ($query) use ($request) {
                $query->orWhere('subsidiaries.name', 'like', '%' . $request->search . '%');
            });
        }
        if (isset($request->state)) {
            $all = $all->where('subsidiaries.state', 'like', '%' . $request->state . '%');
        }
        if (isset($request->street)) {
            $all = $all->where('subsidiaries.street', 'like', '%' . $request->street . '%');
        }
        /* Búsqueda avanzada A-Z */
        if (isset($request->id)) {
            $all = $all->where('subsidiaries.id', $request->id);
            $all = $all->first();
        } else {
            $all = $all->get();            
        }
        return response()->json($all);
    }

    public function insertSubsidiary(Request $request)
    {
        Log::info('Controller insertSubsidiary. Request:'.$request);
        $requestSubsidiary = json_decode($request->subsidiary, true);
        $validator = Validator::make($requestSubsidiary, [
            'name' => ['required', 'max:255', 'min:1'],
            'is_central' => ['required', 'boolean'],
            'street' => ['required', 'max:255', 'min:1'],
            'exterior' => ['required', 'max:255', 'min:1'],
            'postal_code' => ['required', 'max:255', 'min:1'],
            'neighborhood' => ['required', 'max:255', 'min:1'],
            'city' => ['required', 'max:255', 'min:1'],
            'municipality' => ['required', 'max:255', 'min:1'],
            'state' => ['required', 'max:255', 'min:1'],
            'country' => ['required', 'max:255', 'min:1'],
            'business_id' => ['required', 'integer', 'exists:App\Models\Business,id']
        ]);
        if(!$validator->passes()){
            $validation = response()->json(['errors' => $validator->errors()->all(), 'message' => "The given data was invalid."], 422);
            Log::error('Controller insertSubsidiary. Validation:'.$validation);
            return $validation;
        }
        try {
            $subsidiary = new Subsidiary;//SubsidiaryObserver created
            $subsidiary->name = $requestSubsidiary['name'];
            $subsidiary->street = $requestSubsidiary['street'];
            $subsidiary->exterior = $requestSubsidiary['exterior'];
            $subsidiary->interior = $requestSubsidiary['interior'];
            $subsidiary->postal_code = $requestSubsidiary['postal_code'];
            $subsidiary->neighborhood  = $requestSubsidiary['neighborhood'];
            $subsidiary->city = $requestSubsidiary['city'];
            $subsidiary->municipality = $requestSubsidiary['municipality'];
            $subsidiary->state = $requestSubsidiary['state'];
            $subsidiary->country = $requestSubsidiary['country'];
            $subsidiary->is_central = $requestSubsidiary['is_central'];
            $subsidiary->references = $requestSubsidiary['references'];
            $subsidiary->business_id = $requestSubsidiary['business_id'];
            $subsidiary->save();
            $subsidiaryId = $subsidiary->id;
            $message = "Insertó sucursal.";
            $rowUpdateService = array();
            if ($request->hasFile('logoForm')) {
                $logoName = $subsidiaryId . '.' . $request->logoForm->extension();
                $request->logoForm->storeAs('subsidiaries/logos', $logoName, 'public');
                $rowUpdateService['logo'] =  $logoName;
                $message .= "Guardó logo.";
            }
            if ($request->hasFile('overlayForm')) {
                $overlayName = $subsidiaryId . '.' . $request->overlayForm->extension();
                $request->overlayForm->storeAs('subsidiaries/overlays', $overlayName, 'public');
                $rowUpdateService['overlay'] =  $overlayName;
                $message .= "Guardó fondo.";
            }
            Subsidiary::where('id', $subsidiaryId)
            ->update($rowUpdateService);
            $response = response()->json(['status' => 200, 'message' => $message]);
            Log::alert('Controller insertSubsidiary. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json(['status' => 500, 'message' => $catchError->getMessage()]);
            Log::error('Controller insertSubsidiary. Error:'.$error);
            return $error;
        }
    }

    public function exportSubsidiaries(Request $request)
    {
        return Excel::download(new SubsidiariesExport, 'subsidiaries.xlsx');
    }

    public function updateSubsidiary(Request $request)
    {
        Log::info('Controller updateSubsidiary. Request:'.$request);
        $requestSubsidiary = json_decode($request->subsidiary, true);
        $validator = Validator::make($requestSubsidiary, [
            'id' => ['required', 'integer'],
            'name' => ['required', 'max:255', 'min:1'],
            'is_central' => ['required', 'boolean'],
            'street' => ['required', 'max:255', 'min:1'],
            'exterior' => ['required', 'max:255', 'min:1'],
            'postal_code' => ['required', 'max:255', 'min:1'],
            'neighborhood' => ['required', 'max:255', 'min:1'],
            'city' => ['required', 'max:255', 'min:1'],
            'municipality' => ['required', 'max:255', 'min:1'],
            'state' => ['required', 'max:255', 'min:1'],
            'country' => ['required', 'max:255', 'min:1'],
            'business_id' => ['required', 'integer', 'exists:App\Models\Business,id']
        ]);
        if(!$validator->passes()){
            $validation = response()->json(['errors' => $validator->errors()->all(), 'message' => "The given data was invalid."], 422);
            Log::error('Controller updateSubsidiary. Validation:'.$validation);
            return $validation;
        }
        try {
            $subsidiaryUpdate = array(
                'name' => $requestSubsidiary['name'],
                'street' => $requestSubsidiary['street'],
                'exterior' => $requestSubsidiary['exterior'],
                'interior' => $requestSubsidiary['interior'],
                'postal_code' => $requestSubsidiary['postal_code'],
                'neighborhood' => $requestSubsidiary['neighborhood'],
                'city' => $requestSubsidiary['city'],
                'municipality' => $requestSubsidiary['municipality'],
                'state' => $requestSubsidiary['state'],
                'country' => $requestSubsidiary['country'],
                'is_central' => $requestSubsidiary['is_central'],
                'references' => $requestSubsidiary['references'],
                'business_id' => $requestSubsidiary['business_id']
            );
            $message = "Actualizó sucursal.";
            if ($request->hasFile('logoForm')) {
                Storage::disk('public')->delete('subsidiaries/logos' . $requestSubsidiary['logo']);
                $logoName = $requestSubsidiary['id'] . '.' . $request->logoForm->extension();
                $request->logoForm->storeAs('subsidiaries/logos', $logoName, 'public');
                $subsidiaryUpdate['logo'] =  $logoName;
                $message .= "Guardó logo.";
            }
            if ($request->hasFile('overlayForm')) {
                Storage::disk('public')->delete('subsidiaries/overlays' . $requestSubsidiary['overlay']);
                $overlayName = $requestSubsidiary['id'] . '.' . $request->overlayForm->extension();
                $request->overlayForm->storeAs('subsidiaries/overlays', $overlayName, 'public');
                $subsidiaryUpdate['overlay'] =  $overlayName;
                $message .= "Guardó fondo.";
            }
            Subsidiary::where('id', $requestSubsidiary['id'])//SubsidiaryObserver updated
            ->update($subsidiaryUpdate);
            $response = response()->json(['status' => 200, 'message' => $message]);
            Log::alert('Controller updateSubsidiary. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json(['status' => 500, 'message' => $catchError->getMessage()]);
            Log::error('Controller updateSubsidiary. Error:'.$error);
            return $error;
        }
    }

    public function getSubsidiaryLogo($logo = null)
    {
        Log::info('Controller getSubsidiaryLogo. Request:'.$logo);
        if (isset($logo)) {
            try {
                $response = Storage::response("public/subsidiaries/logos/" . $logo);
                Log::alert('Controller getSubsidiaryLogo. Response:'.$response);
                return $response;
            } catch (\Exception $e) {
                $error = Storage::response("public/subsidiaries/logos/default.png");
                Log::error('Controller getSubsidiaryLogo. Error:'.$error);
                return $error;
            }
        } else {
            $error = Storage::response("public/subsidiaries/logos/default.png");
            Log::error('Controller getSubsidiaryLogo. Error:'.$error);
            return $error;
        }
    }

    public function downloadSubsidiaryLogo(Request $request)
    {
        Log::info('Controller downloadSubsidiaryLogo. Request:'.$request);
        if (isset($request->logo)) {
            try {
                $response = Storage::download("public/subsidiaries/logos/" . $request->logo);
                Log::alert('Controller downloadSubsidiaryLogo. Response:'.$response);
                return $response;
            } catch (\Exception $e) {
                $error = Storage::download("public/subsidiaries/logos/default.png");
                Log::error('Controller downloadSubsidiaryLogo. Error:'.$error);
                return $error;
            }
        } else {
            $error = Storage::download("public/subsidiaries/logos/default.png");
            Log::error('Controller downloadSubsidiaryLogo. Error:'.$error);
            return $error;
        }
    }

    public function getSubsidiaryOverlay($overlay = null)
    {
        Log::info('Controller getSubsidiaryOverlay. Request:'.$overlay);
        if (isset($overlay)) {
            try {
                $response = Storage::response("public/subsidiaries/overlays/" . $overlay);
                Log::alert('Controller getSubsidiaryOverlay. Response:'.$response);
                return $response;
            } catch (\Exception $e) {
                $error = Storage::response("public/subsidiaries/overlays/default.jpg");
                Log::error('Controller getSubsidiaryOverlay. Error:'.$error);
                return $error;
            }
        } else {
            $error = Storage::response("public/subsidiaries/overlays/default.jpg");
            Log::error('Controller getSubsidiaryOverlay. Error:'.$error);
            return $error;
        }
    }

    public function downloadSubsidiaryOverlay(Request $request)
    {
        Log::info('Controller downloadSubsidiaryOverlay. Request:'.$request);
        if (isset($request->overlay)) {
            try {
                $response = Storage::download("public/subsidiaries/overlays/" . $request->overlay);
                Log::alert('Controller downloadSubsidiaryOverlay. Response:'.$response);
                return $response;
            } catch (\Exception $e) {
                $error = Storage::download("public/subsidiaries/overlays/default.jpg");
                Log::error('Controller downloadSubsidiaryOverlay. Error:'.$error);
                return $error;
            }
        } else {
            $error = Storage::download("public/subsidiaries/overlays/default.jpg");
            Log::error('Controller downloadSubsidiaryOverlay. Error:'.$error);
            return $error;
        }
    }
}
