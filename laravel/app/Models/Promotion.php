<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Promotion extends Model
{
    use SoftDeletes;
    protected $table = 'promotions';
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
        'name' => 'VARCHAR(255)|NN',
        'expires_at' => 'DATETIME|NN',
        'price' => 'BIGDECIMAL(20)|NN|UN',
        'cost' => 'BIGDECIMAL(20)|NN|UN',
        'enterprise_id' => 'BIGINT|NN|UN', 
        'business_id' => 'BIGINT|UN|D:NULL', 
        'subsidiary_id' => 'BIGINT|UN|D:NULL', 
        'created_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP',
        'updated_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        'deleted_at' => 'DATETIME|D:NULL'
    ];
    
    protected $indexes = [
    ];
    
    protected $foreignKeys = [
        'enterprise_id' => 'enterprises.id', 
        'business_id' => 'businesses.id', 
        'subsidiary_id' => 'subsidiaries.id'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'expires_at', 'enterprise_id', 'business_id', 'subsidiary_id' 
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
        'price' => 'float',
        'cost' => 'float',
        'enterprise_id' => 'integer',
        'business_id' => 'integer',
        'subsidiary_id' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
        
        'amountCost' => 'float',
        'amountPrice' => 'float'
    ];

    /**
     * Foreign keys
     */
    public function enterprise()
    {
        return $this->belongsTo('App\Models\Enterprise');//A promotion belongs to an enterprise
    }

    public function business()
    {
        return $this->belongsTo('App\Models\Business');//A promotion belongs to a business
    }

    public function subsidiary()
    {
        return $this->belongsTo('App\Models\Subsidiary');//A promotion belongs to a subsidiary
    }

    /**
     * Relations
     */  
    public function orderDetails()
    {
        return $this->hasMany('App\Models\OrderDetail');//A promotion has many order details
    }    

    public function saleDetails()
    {
        return $this->hasMany('App\Models\SaleDetail');//A promotion has many sale details
    }  
}
