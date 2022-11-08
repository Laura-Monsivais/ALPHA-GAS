<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Query\Expression;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->string('image')->nullable();
            $table->string('name');
            $table->string('description')->nullable();
            $table->unsignedDecimal('content')->nullable();
            $table->string('unit');
            $table->unsignedDecimal('cost');
            $table->unsignedDecimal('price');
            $table->unsignedBigInteger('business_id');
            $table->foreign('business_id')->references('id')->on('businesses');
            $table->unique(['name', 'unit', 'business_id']);
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
        Schema::dropIfExists('products');
    }
}
