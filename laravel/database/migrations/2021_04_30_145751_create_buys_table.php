<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Query\Expression;

class CreateBuysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('buys', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->string('name');//invoice
            $table->string('provenance')->nullable();
            $table->string('transport')->nullable();
            $table->date('embarked_at')->nullable();
            $table->unsignedBigInteger('expected_destination_id');
            $table->foreign('expected_destination_id')->references('id')->on('subsidiaries');
            $table->unsignedBigInteger('destination_id')->nullable();
            $table->foreign('destination_id')->references('id')->on('subsidiaries');
            $table->date('downloaded_at')->nullable();
            $table->unsignedDecimal('total');
            $table->dateTime('created_at')->default(new Expression('CURRENT_TIMESTAMP'));
            $table->dateTime('updated_at')->default(new Expression('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            $table->dateTime('deleted_at')->nullable();
        });
    }
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('buys');
    }
}
