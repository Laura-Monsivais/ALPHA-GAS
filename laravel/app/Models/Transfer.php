<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transfer extends Model
{
    use SoftDeletes;
    protected $table = 'transfers';
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
        'key' => 'ENUM("Output", "Input")|D:Output',
        'name' => 'VARCHAR(255)|NN',
        'inventory_id' => 'BIGINT|UN|NN',
        'quantity' => 'BIGDECIMAL(20)|NN|UN',
        'destination_id' => 'BIGINT|UN|NN',
        'status' => 'ENUM("Pendiente", "Aceptado")|NN|D:"Pendiente"',
        'transfer_id' => 'BIGINT|NN|UN', 
        'created_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP',
        'updated_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        'deleted_at' => 'DATETIME|D:NULL'
    ];
    
    protected $indexes = [
        'unique' => ['name']
    ];
    
    protected $foreignKeys = [  
        'inventory_id' => 'inventories.id',
        'destination_id' => 'subsidiaries.id',
        'transfer_id' => 'transfers.id'    
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'inventory_id',
        'quantity',
        'destination_id',
        'transfer_id'
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
        'destination_id' => 'integer',
        'transfer_id' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    /**
     * Foreign keys
     */
    public function inventory()
    {
        return $this->belongsTo('App\Models\Inventory'); //A transfer belongs to an inventory
    }

    public function destination()
    {
        return $this->belongsTo('App\Models\Subsidiary'); //A transfer belongs to a destination
    }

    /**
     * Relations
     */ 
}
