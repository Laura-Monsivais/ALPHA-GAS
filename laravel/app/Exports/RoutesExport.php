<?php

namespace App\Exports;

use App\Models\Route;
use App\Traits\RouteTrait;
use Maatwebsite\Excel\Concerns\FromCollection;

class RoutesExport implements FromCollection
{
    use RouteTrait;
    /**
     * The name of the export corresponding model.
     *
     * @var string
     */
    protected $model = Route::class;
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $all = $this->queryGetRoutesTrait();
        $all = $all->get();
        return $all;
    }
}

