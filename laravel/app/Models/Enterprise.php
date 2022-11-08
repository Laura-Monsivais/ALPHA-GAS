<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Enterprise extends Model
{
    use SoftDeletes;
    protected $table = 'enterprises';
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
        'name' => 'VARCHAR(255)|NN|UQ',
        'created_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP',
        'updated_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        'deleted_at' => 'DATETIME|D:NULL'
    ];
    
    protected $indexes = [
    ];
    
    protected $foreignKeys = [
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name'
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

    /**
     * Relations
     */  
    public function businesses()
    {
        return $this->hasMany('App\Models\Business');//An enterprise has many businesses
    }
    
    public function promotions()
    {
        return $this->hasMany('App\Models\Promotion');//An enterprise has many promotions
    }
    
    public function externalApis()
    {
        return $this->hasMany('App\Models\ExternalApi');//An enterprise has many external apis
    }
    
    public function services()
    {
        return $this->hasMany('App\Models\Service');//An enterprise has many services
    }
    
    public function buys()
    {
        return $this->hasMany('App\Models\Buy');//An enterprise has many buys
    }
}
