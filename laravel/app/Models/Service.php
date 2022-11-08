<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use SoftDeletes;
    protected $table = 'services';
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
        'description' => 'VARCHAR(255)|D:NULL',
        'cost' => 'BIGDECIMAL(20)|NN|UN',
        'price' => 'BIGDECIMAL(20)|NN|UN',
        'enterprise_id' => 'BIGINT|NN|UN',
        'created_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP',
        'updated_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        'deleted_at' => 'DATETIME|D:NULL'
    ];

    protected $indexes = [
        'unique' => ['name', 'enterprise_id']
    ];

    protected $foreignKeys = [
        'enterprise_id' => 'enterprises.id',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description', 'cost', 'price', 'enterprise_id'
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
        'cost' => 'float',
        'price' => 'float',
        'enterprise_id' => 'integer',
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
        return $this->belongsTo('App\Models\Enterprise');//A service belongs to a enterprise
    }

    /**
     * Relations
     */ 
    public function saleDetails()
    {
        return $this->hasMany('App\Models\SaleDetail');//A service has many sale details
    }   

    public function buyDetails()
    {
        return $this->hasMany('App\Models\BuyDetail');//A service has many buy details
    }
}
