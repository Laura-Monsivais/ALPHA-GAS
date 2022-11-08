<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Address extends Model
{
    use SoftDeletes;
    protected $table = 'addresses';
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
        'street' => 'VARCHAR(255)|NN',
        'exterior' => 'VARCHAR(255)|NN',
        'interior' => 'VARCHAR(255)|D:NULL',
        'postal_code' => 'VARCHAR(255)|NN',
        'neighborhood' => 'VARCHAR(255)|NN',
        'city' => 'VARCHAR(255)|NN',
        'municipality' => 'VARCHAR(255)|NN',
        'state' => 'VARCHAR(255)|NN',
        'country' => 'VARCHAR(255)|NN',
        'references' => 'VARCHAR(255)|D:NULL',     
        'client_id' => 'BIGINT|NN',
        'created_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP',
        'updated_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        'deleted_at' => 'DATETIME|D:NULL'
    ];
    
    protected $indexes = [
        'unique' => ['name', 'client_id']
    ];
    
    protected $foreignKeys = [        
        'client_id' => 'sessions.id'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'street',
        'exterior',
        'interior',
        'postal_code',
        'neighborhood',
        'city',
        'municipality',
        'state',
        'country',
        'references',
        'client_id'
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
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    /**
     * Foreign keys
     */
    public function session()
    {
        return $this->belongsTo('App\Models\Session');//An address belongs to a session
    }

    /**
     * Relations
     */ 
    public function orders()
    {
        return $this->hasMany('App\Models\Order');//An address has many orders
    }  
}
