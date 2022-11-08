<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Session extends Model
{
    use SoftDeletes;
    protected $table = 'sessions';
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
        'user_id' => 'BIGINT|UN|NN', 
        'rol_id' => 'BIGINT|UN|NN', 
        'subsidiary_id' => 'BIGINT|UN|NN', 
        'created_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP',
        'updated_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        'deleted_at' => 'DATETIME|D:NULL'
    ];
    
    protected $indexes = [
        'unique' => ['user_id', 'rol_id', 'subsidiary_id']
    ];
    
    protected $foreignKeys = [
        'user_id' => 'users.id',
        'rol_id' => 'roles.id',
        'subsidiary_id' => 'subsidiaries.id'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'rol_id', 'subsidiary_id'
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
    public function user()
    {
        return $this->belongsTo('App\Models\User');//A session belongs to an user
    }
    
    public function rol()
    {
        return $this->belongsTo('App\Models\Rol');//A session belongs to a rol
    }

    public function subsidiary()
    {
        return $this->belongsTo('App\Models\Subsidiary');//A session belongs to a subsidiary
    }

    /**
     * Relations
     */ 
    public function users()
    {
        return $this->hasMany('App\Models\User');//A session has may users
    }

    public function addresses()
    {
        return $this->hasMany('App\Models\Address');//A session has may addresses
    }

    public function orders()
    {
        return $this->hasMany('App\Models\Order');//A session has may orders
    }

    public function sales()
    {
        return $this->hasMany('App\Models\Sale');//A session has may sales
    }

    public function routes()
    {
        return $this->hasMany('App\Models\Route');//A session has may routes
    }

}
