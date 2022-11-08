<?php

namespace App\Exports;

use App\Models\Sale;
use App\Traits\SaleTrait;
use Maatwebsite\Excel\Concerns\FromCollection;

class SalesExport implements FromCollection
{
    use SaleTrait;
    /**
     * The name of the export corresponding model.
     *
     * @var string
     */
    protected $model = Sale::class;
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $all = $this->queryGetSalesTrait();
        $all = $all->get();
        return $all;
    }
}
