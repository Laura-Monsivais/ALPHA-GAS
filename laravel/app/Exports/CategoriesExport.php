<?php

namespace App\Exports;

use App\Models\Category;
use App\Traits\CategoryTrait;
use Maatwebsite\Excel\Concerns\FromCollection;

class CategoriesExport implements FromCollection
{
    use CategoryTrait;
    /**
     * The name of the export corresponding model.
     *
     * @var string
     */
    protected $model = Category::class;
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $all = $this->queryGetCategoriesTrait();
        $all = $all->get();
        return $all;
    }
}