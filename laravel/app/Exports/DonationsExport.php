<?php

namespace App\Exports;

use App\Models\Donation;
use App\Traits\DonationTrait;
use Maatwebsite\Excel\Concerns\FromCollection;

class DonationsExport implements FromCollection
{
    use DonationTrait;
    /**
     * The name of the export corresponding model.
     *
     * @var string
     */
    protected $model = Donation::class;
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $all = $this->queryGetDonationsTrait();
        $all = $all->get();
        return $all;
    }
}
