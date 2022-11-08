<?php

namespace App\Exports;

use App\Models\SelfconsumptionModel;
use App\Traits\SelfconsumptionTrait;
use Maatwebsite\Excel\Concerns\FromCollection;

class SelfconsumptionsExport implements FromCollection
{
    use SelfconsumptionTrait;
    /**
     * The name of the export corresponding model.
     *
     * @var string
     */
    protected $model = SelfconsumptionModel::class;

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $all = $this->queryGetSelfconsumptionsTrait();
        $all = $all->get();
        return $all;
    }
}
