<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Business extends Model
{
    use SoftDeletes;
    protected $table = 'businesses';
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
        'enterprise_id' => 'BIGINT|NN|UN', 
        'attention_id' => 'BIGINT|NN|UN', 
        'created_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP',
        'updated_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        'deleted_at' => 'DATETIME|D:NULL'
    ];
    
    protected $indexes = [
        'unique' => ['name', 'enterprise_id', 'attention_id']
    ];
    
    protected $foreignKeys = [
        'enterprise_id' => 'enterprises.id', 
        'attention_id' => 'attentions.id', 
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'enterprise_id', 'attention_id' 
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
    public function enterprise()
    {
        return $this->belongsTo('App\Models\Enterprise');//A business belongs to an enterprise
    }

    public function attention()
    {
        return $this->belongsTo('App\Models\Attention');//A business belongs to an attention
    }

    /**
     * Relations
     */  
    public function subsidiaries()
    {
        return $this->hasMany('App\Models\Subsidiary');//A business has many subsidiaries
    }

    public function promotions()
    {
        return $this->hasMany('App\Models\Promotion');//A business has many promotions
    }
    
    public function categories()
    {
        return $this->hasMany('App\Models\Category');//A business has many categories
    }
    
    public function products()
    {
        return $this->hasMany('App\Models\Product');//A business has many products
    }
    
    public function buys()
    {
        return $this->hasMany('App\Models\Buy');//A business has many buys
    }
}
