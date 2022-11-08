<?php

namespace App\Http\Controllers\Outside;

use App\Http\Controllers\Controller;
use App\Models\Enterprise;
use App\Traits\EnterpriseTrait;
use Illuminate\Http\Request;

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
        $all = $all->get();
        return response()->json($all);
    }  

    public function getEnterpriseLogo($logo = null) 
    {
        $response = $this->codeGetEnterpriseLogoTrait("outside", $logo);
        return $response;
    }
}
