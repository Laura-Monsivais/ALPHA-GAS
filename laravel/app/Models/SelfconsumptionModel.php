<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SelfconsumptionModel extends Model
{
    use SoftDeletes;
    protected $table = 'selfconsumptions';
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
        'inventory_id' => 'BIGINT|UN|NN',
        'quantity' => 'BIGDECIMAL(20)|NN|UN',
        'cost' => 'BIGDECIMAL(100)|NN|UN',
        'total' => 'BIGDECIMAL(100)|NN|UN',
        'route_id' => 'BIGINT|UN|NN',
        'start' => 'DATE|NN',
        'end' => 'DATE|NN',        
        'initial_mileage' => 'BIGDECIMAL(1000)|NN|UN',
        'end_mileage' => 'BIGDECIMAL(1000)|NN|UN',
        'performance' => 'BIGDECIMAL(1000)|NN|UN',
        'created_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP',
        'updated_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        'deleted_at' => 'DATETIME|D:NULL'
    ];

    protected $indexes = [];

    protected $foreignKeys = [
        'inventory_id' => 'inventories.id',
        'route_id' => 'routes.id'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'inventory_id', 
        'quantity', 
        'cost', 
        'total', 
        'route_id', 
        'start', 
        'end', 
        'initial_mileage', 
        'end_mileage', 
        'performance'
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
        'inventory_id' => 'integer',
        'quantity' => 'float', 
        'cost' => 'float',
        'total' => 'float',
        'route_id' => 'integer',
        'initial_mileage' => 'float',
        'end_mileage' => 'float',
        'performance' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    /**
     * Foreign keys
     */
    public function inventory()
    {
        return $this->belongsTo('App\Models\Inventory'); //A selfconsumption belongs to an inventory
    }
    
    public function routes()
    {
        return $this->belongsTo('App\Models\Route'); //A selfconsumption belongs to a route
    }
}