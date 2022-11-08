<?php

namespace App\Exports;

use App\Models\Buy;
use App\Traits\BuyTrait;
use Maatwebsite\Excel\Concerns\FromCollection;

class BuysExport implements FromCollection
{
    use BuyTrait;
    /**
     * The name of the export corresponding model.
     *
     * @var string
     */
    protected $model = Buy::class;
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $all = $this->queryGetBuysTrait();
        $all = $all->get();
        return $all;
    }
}
