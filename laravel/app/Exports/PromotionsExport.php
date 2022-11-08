<?php

namespace App\Exports;

use App\Models\Promotion;
use App\Traits\PromotionTrait;
use Maatwebsite\Excel\Concerns\FromCollection;

class PromotionsExport implements FromCollection
{
    use PromotionTrait;
    /**
     * The name of the export corresponding model.
     *
     * @var string
     */
    protected $model = Promotion::class;
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $all = $this->queryGetPromotionsTrait();
        $all = $all->get();
        return $all;
    }
}
