<?php

namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Enterprise;
use App\Models\Sale;
use App\Models\Session;
use App\Models\Subsidiary;
use App\Traits\SaleTrait;
use App\Traits\SubsidiaryTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    use SaleTrait, SubsidiaryTrait;

    public function getSubsidiaresSales(Request $request)
    {
        $chartLabels = array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
        $data = array();
        foreach ($chartLabels as $chartLabel) {
            array_push($data, 0);
        }
        $chartColors = array();
        $datasets = array();
        $subsidiaries = $this->queryGetSubsidiariesTrait()->get();
        foreach ($subsidiaries as $subsidiary) {
            array_push($chartColors);
            $datasets[$subsidiary['id']] = array('data' => $data, 'label' => $subsidiary['name'], 'formatMoney' => true);
        }
        $sales = $this->queryGetSalesTrait(false)
        ->select(DB::raw('SUM(sales.total) as total'),
            'subsidiaries.id as subsidiaryId',
            DB::raw('MONTH(sales.created_at) as dateMonth'))
        ->groupBy('subsidiaries.id')
        ->groupBy('dateMonth');
        $sales = $sales->get();
        foreach ($sales as $sale) {
            $indexLabel = $sale['dateMonth'] - 1;
            $datasets[$sale['subsidiaryId']]['data'][$indexLabel] = floatval($sale['total']);
        }
        $chartDatasets = array();
        foreach ($datasets as $dataset) {
            array_push($chartDatasets, $dataset);
        }
        return response()->json(['chartLabels' => $chartLabels, 'chartColors' => $chartColors, 'chartDatasets' => $chartDatasets], 200);
    }    
}
