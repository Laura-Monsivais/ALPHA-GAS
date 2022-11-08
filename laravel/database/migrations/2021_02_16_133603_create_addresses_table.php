<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Query\Expression;

class CreateAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->string('name');
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
            $table->unsignedBigInteger('client_id');
            $table->foreign('client_id')->references('id')->on('sessions');
            $table->unique(['name', 'client_id']);
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
        Schema::dropIfExists('addresses');
    }
}
