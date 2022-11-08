<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Query\Expression;

class CreateSelfconsumptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('selfconsumptions', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->unsignedBigInteger('inventory_id');
            $table->foreign('inventory_id')->references('id')->on('inventories');
            $table->unsignedDecimal('quantity');
            $table->unsignedDecimal('cost');
            $table->unsignedDecimal('total');            
            $table->unsignedBigInteger('route_id');
            $table->foreign('route_id')->references('id')->on('routes');
            $table->date('start');
            $table->date('end');
            $table->unsignedDecimal('initial_mileage');
            $table->unsignedDecimal('end_mileage');
            $table->unsignedDecimal('performance');
            $table->unique(['route_id', 'start', 'end']);
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
        Schema::dropIfExists('selfconsumptions');
    }
}
