<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BuyDetail extends Model
{
    //use SoftDeletes; Elimina esto para que detecte los eliminados al modificar
    protected $table = 'buy_details';
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
        'buy_id' => 'BIGINT|NN|UN',
        'inventory_id' => 'BIGINT|UN|D:NULL',
        'density' => 'DECIMAL(8,2)|UN|D:NULL',
        'conversion' => 'DECIMAL(8,2)|UN|D:NULL',
        'product_id' => 'BIGINT|UN|D:NULL',
        'service_id' => 'BIGINT|UN|D:NULL',
        'quantity' => 'DECIMAL(8,2)|NN|UN',
        'cost' => 'DECIMAL(8,2)|NN|UN',
        'amount' => 'DECIMAL(8,2)|NN|UN',
        'created_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP',
        'updated_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        'deleted_at' => 'DATETIME|D:NULL'
    ];
    
    protected $indexes = [
    ];
    
    protected $foreignKeys = [        
        'buy_id' => 'buys.id',
        'inventory_id' => 'inventories.id',
        'product_id' => 'products.id',
        'service_id' => 'services.id',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'buy_id',
        'inventory_id',
        'density',
        'conversion',
        'product_id',
        'service_id',
        'quantity',
        'cost',
        'amount'
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
        'buy_id' => 'integer',
        'inventory_id' => 'integer',
        'density' => 'float',
        'conversion' => 'float',        
        'product_id' => 'integer',
        'service_id' => 'integer',
        'quantity' => 'float',
        'cost' => 'float',
        'amount' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    /**
     * Foreign keys
     */
    public function buy()
    {
        return $this->belongsTo('App\Models\Buy');//A buy detail belongs to a buy
    }
    
    public function inventory()
    {
        return $this->belongsTo('App\Models\Inventory');//A buy detail belongs to an inventory
    }
    
    public function product()
    {
        return $this->belongsTo('App\Models\Product');//A buy detail belongs to a product
    }
    
    public function service()
    {
        return $this->belongsTo('App\Models\Service');//A buy detail belongs to a service
    }
    /**
     * Relations
     */   
}
