<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use SoftDeletes;
    protected $table = 'orders';
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
        'code' => 'VARCHAR(255)|NN|UQ',
        'client_id' => 'BIGINT|NN',
        'observation' => 'VARCHAR(255)|D:NULL',  
        'address_id' => 'BIGINT|NN',
        'deliver_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP',
        'total' => 'DECIMAL(8,2)|NN|UN',  
        'status' => 'ENUM("Pendiente", "Atendiendo", "Entregado")|NN|D:"Pendiente"',
        'created_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP',
        'updated_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        'deleted_at' => 'DATETIME|D:NULL'
    ];
    
    protected $indexes = [
    ];
    
    protected $foreignKeys = [      
        'client_id' => 'sessions.id',  
        'address_id' => 'addresses.id'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'code',
        'client_id',
        'observation',
        'address_id',
        'deliver_at',
        'total',
        'status'
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
        'client_id' => 'integer',
        'address_id' => 'integer',
        'deliver_at' => 'datetime',
        'total' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    /**
     * Foreign keys
     */    
    public function client()
    {
        return $this->belongsTo('App\Models\Session', 'client_id');//An order belongs to a client
    }

    public function address()
    {
        return $this->belongsTo('App\Models\Address');//An order belongs to a address
    }

    /**
     * Relations
     */   
}
