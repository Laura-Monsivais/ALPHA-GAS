<?php

namespace App\Exports;

use App\Models\Subsidiary;
use App\Traits\SubsidiaryTrait;
use Maatwebsite\Excel\Concerns\FromCollection;

class SubsidiariesExport implements FromCollection
{
    use SubsidiaryTrait;
    /**
     * The name of the export corresponding model.
     *
     * @var string
     */
    protected $model = Subsidiary::class;
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $all = $this->queryGetSubsidiariesTrait();
        $all = $all->get();
        return $all;
    }
}
