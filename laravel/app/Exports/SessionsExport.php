<?php

namespace App\Exports;

use App\Models\Session;
use App\Traits\SessionTrait;
use Maatwebsite\Excel\Concerns\FromCollection;

class SessionsExport implements FromCollection
{
    use SessionTrait;
    /**
     * The name of the export corresponding model.
     *
     * @var string
     */
    protected $model = Session::class;
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $all = $this->queryGetSessionsTrait();
        $all = $all->get();
        return $all;
    }
}
