<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Inventory extends Model
{
    use SoftDeletes;
    protected $table = 'inventories';
    protected $engine = 'InnoDB';
    protected $primaryKey  = 'id';

    /**
     * PK = Primary Key
     * NN = Not Null
     * UQ = Unique
     * B = Binary
     * UN = Unsigned
     * ZF = Zero Fill
     * AI = Auto Increment
     * G = Generated
     * D: = Default
     */
    protected $columns = [
        'id' => 'BIGINT|PK|NN|UN|AI',
        'subsidiary_id',
        'product_id',
        'inventory_theoretical',
        'inventory_real',
        'inventory_difference',
        'buys',
        'sales',
        'selfconsumptions',
        'donations',
        'earnings',
        'created_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP',
        'updated_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        'deleted_at' => 'DATETIME|D:NULL'
    ];

    protected $indexes = [
        'unique' => []
    ];

    protected $foreignKeys = [
        'subsidiary_id' => 'subsidiaries.id',
        'product_id' => 'products.id',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'subsidiary_id',
        'product_id',
        'inventory_theoretical',
        'inventory_real',
        'inventory_difference',
        'buys',
        'sales',
        'selfconsumptions',
        'donations',
        'earnings'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'subsidiary_id' => 'integer',
        'product_id' => 'integer',
        'inventory_theoretical' => 'float',
        'inventory_real' => 'float',
        'inventory_difference' => 'float',
        'buys' => 'float',
        'sales' => 'float',
        'selfconsumptions' => 'float',
        'donations' => 'float',
        'earnings' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    /**
     * Foreign keys
     */

    /**
     * Relations
     */
    public function products()
    {
        return $this->hasMany('App\Models\Product'); //An inventory has many products  
    }
    public function subsidiaries()
    {
        return $this->hasMany('App\Models\Subsidiary'); //An inventory has many subsidiaries  
    }
}
