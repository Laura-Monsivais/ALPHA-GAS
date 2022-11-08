<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Query\Expression;

class CreateSubsidiariesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subsidiaries', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');            
            $table->string('logo')->nullable();            
            $table->string('overlay')->nullable();
            $table->string('name');
            $table->boolean('is_central')->default(false);
            $table->string('street');
            $table->string('exterior');
            $table->string('interior')->nullable();
            $table->string('postal_code');
            $table->string('neighborhood');
            $table->string('city');
            $table->string('municipality');
            $table->string('state');
            $table->string('country');
            $table->string('references')->nullable();
            $table->unsignedBigInteger('business_id');
            $table->foreign('business_id')->references('id')->on('businesses');
            /**
             * @todo Agregar campos a sucursales para saber cuanto a vendido, etc
             **/
            $table->unique(['name', 'business_id']);
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
        Schema::dropIfExists('subsidiaries');
    }
}
