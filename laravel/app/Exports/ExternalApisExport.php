<?php

namespace App\Exports;

use App\Models\ExternalApi;
use App\Traits\ExternalApiTrait;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExternalApisExport implements FromCollection
{
    use ExternalApiTrait;
    /**
     * The name of the export corresponding model.
     *
     * @var string
     */
    protected $model = ExternalApi::class;
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $all = $this->queryGetExternalApisTrait();
        $all = $all->get();
        return $all;
    }
}
