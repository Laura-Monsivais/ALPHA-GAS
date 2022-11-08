<?php

namespace App\Exports;

use App\Models\Order;
use App\Traits\OrderTrait;
use Maatwebsite\Excel\Concerns\FromCollection;

class OrdersExport implements FromCollection
{
    use OrderTrait;
    /**
     * The name of the export corresponding model.
     *
     * @var string
     */
    protected $model = Order::class;
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $all = $this->queryGetOrdersTrait();
        $all = $all->get();
        return $all;
    }
}
