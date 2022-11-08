<?php

namespace App\Models; 

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Route extends Model
{
    use SoftDeletes;
    protected $table = 'routes';
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
        'route_type_id' => 'BIGINT|NN', 
        'maximum_capacity' => 'DECIMAL(8,2)|NN|UN',
        'minimum_capacity' => 'DECIMAL(8,2)|NN|UN',
        'seller_id' => 'BIGINT|NN', 
        'cellphone' => 'VARCHAR(10)|NN|UQ',
        'created_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP',
        'updated_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        'deleted_at' => 'DATETIME|D:NULL'
    ];
    
    protected $indexes = [
        'unique' => ['name', 'route_type_id', 'seller_id']
    ];
    
    protected $foreignKeys = [        
        'route_type_id' => 'route_types.id',
        'seller_id' => 'sessions.id',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'route_type_id',
        'maximum_capacity',
        'minimum_capacity',
        'seller_id',
        'cellphone'
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
        'route_type_id' => 'integer',
        'maximum_capacity' => 'float',
        'minimum_capacity' => 'float',
        'seller_id' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    /**
     * Foreign keys
     */
    public function routeType()
    {
        return $this->belongsTo('App\Models\RouteType');//A route belongs to a route type
    }
    
    public function seller()
    {
        return $this->belongsTo('App\Models\Session', 'seller_id');//A route belongs to a seller
    }
    /**
     * Relations
     */  

}