<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Query\Expression;

class CreateInventoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inventories', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->unsignedBigInteger('subsidiary_id');
            $table->foreign('subsidiary_id')->references('id')->on('subsidiaries');
            $table->unsignedBigInteger('product_id');
            $table->foreign('product_id')->references('id')->on('products');       
            $table->unsignedDecimal('inventory_theoretical')->default(0); 
            $table->unsignedDecimal('inventory_real')->default(0);
            $table->decimal('inventory_difference')->default(0);
            $table->unsignedDecimal('buys')->default(0);
            $table->unsignedDecimal('sales')->default(0);
            $table->unsignedDecimal('selfconsumptions')->default(0);
            $table->unsignedDecimal('donations')->default(0);
            $table->decimal('earnings')->default(0);//Puede irse a negativos
            $table->unique(['subsidiary_id', 'product_id']);
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
        Schema::dropIfExists('inventories');
    }
}
