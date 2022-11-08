<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subsidiary extends Model
{
    use SoftDeletes;
    protected $table = 'subsidiaries';
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
        'is_central' => 'TINYINT(1)|NN', 
        'references' => 'VARCHAR(255)|D:NULL',     
        'business_id' => 'BIGINT|UN|NN', 
        'created_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP',
        'updated_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        'deleted_at' => 'DATETIME|D:NULL'
    ];
    
    protected $indexes = [
        'unique' => ['name', 'business_id']
    ];
    
    protected $foreignKeys = [
        'business_id' => 'businesses.id'
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
        'is_central',
        'references', 
        'business_id'
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
    public function business()
    {
        return $this->belongsTo('App\Models\Business');//A subsidiary belongs to a business
    }

    /**
     * Relations
     */ 
    public function promotions()
    {
        return $this->hasMany('App\Models\Promotion');//A subsidiary has may promotions
    }

    public function sessions()
    {
        return $this->hasMany('App\Models\Session');//A subsidiary has may sessions
    }

    public function buys()
    {
        return $this->hasMany('App\Models\Buy');//A subsidiary has may buys
    }
}