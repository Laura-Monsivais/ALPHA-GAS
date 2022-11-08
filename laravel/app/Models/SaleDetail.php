<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SaleDetail extends Model
{
    //use SoftDeletes; Elimina esto para que detecte los eliminados al modificar
    protected $table = 'sale_details';
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
        'sale_id' => 'BIGINT|NN',
        'inventory_id' => 'BIGINT|UN|D:NULL',
        'product_id' => 'BIGINT|UN|D:NULL',
        'service_id' => 'BIGINT|UN|D:NULL',
        'promotion_id' => 'BIGINT|UN|D:NULL',
        'quantity' => 'DECIMAL(8,2)|NN|UN',
        'price' => 'DECIMAL(8,2)|NN|UN',
        'amount' => 'DECIMAL(8,2)|NN|UN',
        'created_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP',
        'updated_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        'deleted_at' => 'DATETIME|D:NULL'
    ];
    
    protected $indexes = [
        'unique' => ['sale_id', 'product_id', 'service_id', 'promotion_id', 'price']
    ];
    
    protected $foreignKeys = [        
        'sale_id' => 'sales.id',
        'inventory_id' => 'inventories.id',
        'product_id' => 'products.id',
        'service_id' => 'services.id',
        'promotion_id' => 'promotions.id'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'sale_id',
        'inventory_id',
        'product_id',
        'service_id',
        'promotion_id',
        'quantity',
        'price',
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
        'sale_id' => 'integer',
        'inventory_id' => 'integer',
        'product_id' => 'integer',
        'service_id' => 'integer',
        'promotion_id' => 'integer',
        'quantity' => 'float',
        'price' => 'float',
        'amount' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    /**
     * Foreign keys
     */
    public function sale()
    {
        return $this->belongsTo('App\Models\Sale');//A sale detail belongs to an order
    }

    public function inventory()
    {
        return $this->belongsTo('App\Models\Inventory');//A sale detail belongs to an inventory
    }

    public function promotion()
    {
        return $this->belongsTo('App\Models\Promotion');//A sale detail belongs to a promotion
    }
    
    public function product()
    {
        return $this->belongsTo('App\Models\Product');//A sale detail belongs to a product
    }
    
    public function service()
    {
        return $this->belongsTo('App\Models\Service');//A sale detail belongs to a service
    }

    /**
     * Relations
     */   
}
