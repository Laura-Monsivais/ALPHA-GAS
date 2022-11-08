<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use SoftDeletes;
    protected $table = 'categories';
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
        'business_id' => 'BIGINT|NN|UN', 
        'created_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP',
        'updated_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        'deleted_at' => 'DATETIME|D:NULL'
    ];
    
    protected $indexes = [
        'unique' => ['name', 'business_id']
    ];
    
    protected $foreignKeys = [
        'business_id' => 'businesses.id', 
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'business_id' 
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
        'business_id' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    /**
     * Foreign keys
     */
    public function business()
    {
        return $this->belongsTo('App\Models\Business');//A category belongs to a business
    }

    /**
     * Relations
     */ 
    public function products()
    {
        return $this->hasMany('App\Models\Product');//A category has many products
    }
}
