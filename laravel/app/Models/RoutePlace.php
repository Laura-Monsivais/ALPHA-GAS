<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RoutePlace extends Model
{
    //use SoftDeletes; Elimina esto para que detecte los eliminados al modificar
    protected $table = 'route_places';
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
        'postal_code' => 'VARCHAR(255)|NN',
        'neighborhood' => 'VARCHAR(255)|NN',
        'city' => 'VARCHAR(255)|NN',
        'municipality' => 'VARCHAR(255)|NN',
        'state' => 'VARCHAR(255)|NN',
        'country' => 'VARCHAR(255)|NN',    
        'route_id' => 'BIGINT|NN',
        'created_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP',
        'updated_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        'deleted_at' => 'DATETIME|D:NULL'
    ];
    
    protected $indexes = [
    ];
    
    protected $foreignKeys = [        
        'route_id' => 'routes.id'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'postal_code',
        'neighborhood',
        'city',
        'municipality',
        'state',
        'country',
        'route_id'
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
    public function route()
    {
        return $this->belongsTo('App\Models\Route');//An address belongs to a route
    }

    /**
     * Relations
     */ 
}
