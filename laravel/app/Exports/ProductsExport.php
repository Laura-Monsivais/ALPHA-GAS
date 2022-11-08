<?php

namespace App\Exports;

use App\Models\Product;
use App\Traits\ProductTrait;
use Maatwebsite\Excel\Concerns\FromCollection;

class ProductsExport implements FromCollection
{
    use ProductTrait;
    /**
     * The name of the export corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $all = $this->queryGetProductsTrait();
        $all = $all->get();
        return $all;
    }
}

