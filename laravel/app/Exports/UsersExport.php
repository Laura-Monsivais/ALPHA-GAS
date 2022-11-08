<?php

namespace App\Exports;

use App\Models\User;
use App\Traits\UserTrait;
use Maatwebsite\Excel\Concerns\FromCollection;

class UsersExport implements FromCollection
{
    use UserTrait;
    /**
     * The name of the export corresponding model.
     *
     * @var string
     */
    protected $model = User::class;
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $all = $this->queryGetUsersTrait();
        $all = $all->get();
        return $all;
    }
}
