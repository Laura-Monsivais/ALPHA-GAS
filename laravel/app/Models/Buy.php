<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Buy extends Model
{
    use SoftDeletes;
    protected $table = 'buys';
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
        'provenance' => 'VARCHAR(255)|D:NULL',
        'transport' => 'VARCHAR(255)|D:NULL',
        'embarked_at' => 'DATE|D:NULL',
        'expected_destination_id' => 'BIGINT|NN|UN', 
        'destination_id' => 'BIGINT|UN|D:NULL',
        'downloaded_at' => 'DATE|D:NULL',
        'total' => 'DECIMAL(8,2)|NN|UN',
        'created_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP',
        'updated_at' => 'DATETIME|NN|D:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        'deleted_at' => 'DATETIME|D:NULL'
    ];

    protected $indexes = [];

    protected $foreignKeys = [
        'expected_destination_id' => 'subsidiaries.id', 
        'destination_id' => 'subsidiaries.id'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'provenance',
        'transport',
        'embarked_at',
        'expected_destination_id', 
        'destination_id',
        'downloaded_at',
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
        'expected_destination_id' => 'integer',
        'destination_id' => 'integer',
        'total' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    /**
     * Foreign keys
     */
    public function expectedDestination()
    {
        return $this->belongsTo('App\Models\Subsidiary', 'expected_destination_id');//A buy belongs to an expected destination
    }
    public function destination()
    {
        return $this->belongsTo('App\Models\Subsidiary', 'destination_id');//A buy belongs to a destination
    }

    /**
     * Relations
     */
    public function buyDetails()
    {
        return $this->hasMany('App\Models\BuyDetail');//A buy has many buy details
    }
}
