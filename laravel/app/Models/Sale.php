<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sale extends Model
{
    use SoftDeletes;
    protected $table = 'sales';
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
        'seller_id' => 'BIGINT|NN|UN',
        'client_id' => 'BIGINT|UN|D:NULL',
        'order_id' => 'BIGINT|UN|D:NULL',
        'total' => 'DECIMAL(8,2)|NN|UN',
        'created_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP',
        'updated_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        'deleted_at' => 'DATETIME|D:NULL'
    ];

    protected $indexes = [];

    protected $foreignKeys = [
        'seller_id' => 'sessions.id',
        'order_id' => 'orders.id',
        'client_id' => 'sessions.id'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'seller_id',
        'client_id',
        'order_id',
        'total'
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
        'seller_id' => 'integer',
        'client_id' => 'integer',
        'order_id' => 'integer',
        'total' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    /**
     * Foreign keys
     */
    public function seller()
    {
        return $this->belongsTo('App\Models\Session', 'seller_id'); //A sale belongs to a seller
    }

    public function client()
    {
        return $this->belongsTo('App\Models\Session', 'client_id'); //A sale belongs to a client
    }

    public function order()
    {
        return $this->belongsTo('App\Models\Order'); //A sale belongs to an order
    }

    /**
     * Relations
     */
    public function saleDetails()
    {
        return $this->hasMany('App\Models\SaleDetail');//A sale has many sale details
    }
}
