<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Query\Expression;

class CreateRoutesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('routes', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->string('name');
            $table->unsignedBigInteger('route_type_id');
            $table->foreign('route_type_id')->references('id')->on('route_types');
            $table->unsignedDecimal('maximum_capacity');
            $table->unsignedDecimal('minimum_capacity');
            $table->unsignedBigInteger('seller_id');
            $table->foreign('seller_id')->references('id')->on('sessions');
            $table->string('cellphone',10)->unique();
            $table->unique(['name', 'route_type_id', 'seller_id']);
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
        Schema::dropIfExists('routes');
    }
}
