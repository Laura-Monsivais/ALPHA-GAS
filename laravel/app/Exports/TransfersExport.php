<?php

namespace App\Exports;

use App\Models\Transfer;
use App\Traits\TransferTrait;
use Maatwebsite\Excel\Concerns\FromCollection;

class TransfersExport implements FromCollection
{
    use TransferTrait;
    /**
     * The name of the export corresponding model.
     *
     * @var string
     */
    protected $model = Transfer::class;
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $all = $this->queryGetTransfersTrait();
        $all = $all->get();
        return $all;
    }
}
