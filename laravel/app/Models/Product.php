<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;
    protected $table = 'products';
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
        'image' => 'VARCHAR(255)|D:NULL',
        'name' => 'VARCHAR(255)|NN',
        'description' => 'VARCHAR(255)|D:NULL',
        'content' => 'BIGDECIMAL(20)|UN|D:NULL',
        'unit' => 'VARCHAR(255)|NN',
        'cost' => 'BIGDECIMAL(20)|NN|UN',
        'price' => 'BIGDECIMAL(20)|NN|UN',
        'business_id' => 'BIGINT|NN|UN', 
        'category_id' => 'BIGINT|NN|UN', 
        'created_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP',
        'updated_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        'deleted_at' => 'DATETIME|D:NULL'
    ];
    
    protected $indexes = [
        'unique' => ['name', 'unit', 'business_id']
    ];
    
    protected $foreignKeys = [
        'business_id' => 'businesses.id', 
        'category_id' => 'categories.id', 
        
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description', 'content', 'unit', 'cost', 'price', 'business_id' ,'category_id'
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
        'content' => 'float',
        'cost' => 'float',
        'price' => 'float',
        'business_id' => 'integer',
        'category_id' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
        
        'amountCost' => 'float',
        'amountPrice' => 'float',
        'inventoryTheoretical' => 'float'
    ];

    /**
     * Foreign keys
     */
    public function enterprise()
    {
        return $this->belongsTo('App\Models\Enterprise');//A product belongs to an enterprise
    }

    public function business()
    {
        return $this->belongsTo('App\Models\Business');//A product belongs to a business
    }

    public function category()
    {
        return $this->belongsTo('App\Models\Category');//A product belongs to a category
    }

    /**
     * Relations
     */    
    public function orderDetails()
    {
        return $this->hasMany('App\Models\OrderDetail');//A product has many order details
    }    

    public function saleDetails()
    {
        return $this->hasMany('App\Models\SaleDetail');//A product has many sale details
    }   

    public function buyDetails()
    {
        return $this->hasMany('App\Models\BuyDetail');//A product has many buy details
    }
}
