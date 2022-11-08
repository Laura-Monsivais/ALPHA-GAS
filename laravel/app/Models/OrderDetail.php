<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrderDetail extends Model
{
    //use SoftDeletes; Elimina esto para que detecte los eliminados al modificar
    protected $table = 'order_details';
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
        'order_id' => 'BIGINT|NN',
        'promotion_id' => 'BIGINT|D:NULL',
        'product_id' => 'BIGINT|D:NULL',
        'quantity' => 'DECIMAL(8,2)|NN|UN',
        'price' => 'DECIMAL(8,2)|NN|UN',
        'amount' => 'DECIMAL(8,2)|NN|UN',
        'observation' => 'VARCHAR(255)|D:NULL',
        'created_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP',
        'updated_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        'deleted_at' => 'DATETIME|D:NULL'
    ];
    
    protected $indexes = [
        'unique' => ['order_id', 'promotion_id', 'product_id', 'price']
    ];
    
    protected $foreignKeys = [        
        'order_id' => 'orders.id',
        'promotion_id' => 'promotions.id',
        'product_id' => 'products.id'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'order_id',
        'promotion_id',
        'product_id',
        'quantity',
        'price',
        'amount',
        'observation'
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
        'order_id' => 'integer',
        'promotion_id' => 'integer',
        'product_id' => 'integer',
        'quantity' => 'integer',
        'price' => 'float',
        'amount' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    /**
     * Foreign keys
     */
    public function order()
    {
        return $this->belongsTo('App\Models\Order');//An order detail belongs to a order
    }
    
    public function promotion()
    {
        return $this->belongsTo('App\Models\Promotion');//An order detail belongs to a promotion
    }
    
    public function product()
    {
        return $this->belongsTo('App\Models\Product');//An order detail belongs to a product
    }

    /**
     * Relations
     */   
}
