<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use SoftDeletes, Notifiable, HasApiTokens;
    protected $table = 'users';
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
        'lastname1' => 'VARCHAR(255)|NN',
        'lastname2' => 'VARCHAR(255)|D:NULL',
        'cellphone' => 'VARCHAR(10)|NN|UQ',
        'password' => 'VARCHAR(255)|NN',
        'remember_token' => 'VARCHAR(100)|D:NULL',
        'avatar' => 'VARCHAR(255)|D:NULL',        
        'session_id' => 'BIGINT|NN|D:NULL',
        'created_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP',
        'updated_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        'deleted_at' => 'DATETIME|D:NULL'
    ];
    
    protected $indexes = [
    ];
    
    protected $foreignKeys = [        
        'session_id' => 'sessions.id'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'lastname1',
        'lastname2',
        'cellphone',
        'password'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password'
    ];

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
        return $this->belongsTo('App\Models\Session');//An user belongs to a session
    }

    /**
     * Relations
     */  
    public function sessions()
    {
        return $this->belongsToMany('App\Models\Session');//An user has many sessions
    } 
}
