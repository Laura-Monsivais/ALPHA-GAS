<?php

namespace App\Traits;

use App\Models\Enterprise;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

trait EnterpriseTrait 
{   

    public function queryGetEnterprisesTrait()
    {
        $all = Enterprise::whereNull('enterprises.deleted_at');
        if(Auth::check()){
            $all = $all->select('enterprises.id',  
                'enterprises.name',    
                'enterprises.logo', 
                'enterprises.overlay', 
                'enterprises.created_at',
                'enterprises.updated_at')
            ->orderBy('enterprises.updated_at', 'DESC');
        } else {
            $all = $all->select('enterprises.name',
                'enterprises.logo')
            ->inRandomOrder();
        }
        return $all;
    }

    public function codeGetEnterpriseLogoTrait($side, $logo = null)
    {
        Log::info('Trait getEnterpriseLogo. Request:'.$logo);
        if (isset($logo)) {
            try {
                $response = Storage::response("public/enterprises/logos/".$logo);
                Log::alert('Trait getEnterpriseLogo. Response:'.$response);
                return $response;
            } catch (\Exception $e) {
                if($side === "outside"){
                    $error = Storage::response("public/enterprises/logos/default.png");
                    Log::error('Trait getEnterpriseLogo. Error:'.$error);
                    return $error;
                } else {
                    abort(404);
                }
            }
        } else {
            if($side === "outside"){
                $error = Storage::response("public/enterprises/logos/default.png");
                Log::error('Trait getEnterpriseLogo. Error:'.$error);
                return $error;
            } else {
                abort(404);
            }
        }
    }
}