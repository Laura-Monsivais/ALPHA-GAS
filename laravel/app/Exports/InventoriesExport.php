<?php

namespace App\Exports;

use App\Models\Inventory;
use App\Traits\InventoryTrait;
use Maatwebsite\Excel\Concerns\FromCollection;

class InventoriesExport implements FromCollection
{
    use InventoryTrait;
    /**
     * The name of the export corresponding model.
     *
     * @var string
     */
    protected $model = Inventory::class;
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $all = $this->queryGetInventoryTrait();
        $all = $all->get();
        return $all;
    }
}
