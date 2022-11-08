<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ExternalApi extends Model
{
    use SoftDeletes;
    protected $table = 'external_apis';
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
        'function' => 'ENUM("rechargeCellphone", "payCFE", "payTELMEX")|NN|',
        'url' => 'VARCHAR(255)|NN',
        'method' => 'ENUM("GET", "POST")|NN|D:GET',
        'token' => 'VARCHAR(255)|D:NULL',
        'enterprise_id' => 'BIGINT|NN|UN',
        'created_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP',
        'updated_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        'deleted_at' => 'DATETIME|D:NULL'
    ];
    
    protected $indexes = [
        'unique' => ['function', 'enterprise_id']
    ];
    
    protected $foreignKeys = [
        'enterprise_id' => 'enterprises.id'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'function', 'url', 'method', 'token', 'enterprise_id'
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
        'enterprise_id' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    /**
     * Foreign keys
     */
    public function enterprise()
    {
        return $this->belongsTo('App\Models\Enterprise');//An external api belongs to an enterprise
    }

    /**
     * Relations
     */  
}
