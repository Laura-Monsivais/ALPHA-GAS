<?php

namespace App\Exports;

use App\Models\Service;
use App\Traits\ServiceTrait;
use Maatwebsite\Excel\Concerns\FromCollection;

class ServicesExport implements FromCollection
{
    use ServiceTrait;
    /**
     * The name of the export corresponding model.
     *
     * @var string
     */
    protected $model = Service::class;
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $all = $this->queryGetServiceTrait();
        $all = $all->get();
        return $all;
    }
}
