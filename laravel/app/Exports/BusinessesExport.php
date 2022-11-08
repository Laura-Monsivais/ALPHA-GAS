<?php

namespace App\Exports;

use App\Models\Business;
use App\Traits\BusinessTrait;
use Maatwebsite\Excel\Concerns\FromCollection;

class BusinessesExport implements FromCollection
{
    use BusinessTrait;
    /**
     * The name of the export corresponding model.
     *
     * @var string
     */
    protected $model = Business::class;
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $all = $this->queryGetBusinessesTrait();
        $all = $all->get();
        return $all;
    }
}
