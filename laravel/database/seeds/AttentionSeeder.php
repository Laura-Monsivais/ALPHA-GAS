<?php

use Illuminate\Database\Seeder;
use App\Models\Attention;

class AttentionSeeder extends Seeder
{
    /**
     * The name of the seeder corresponding model.
     *
     * @var string
     */
    protected $model = Attention::class;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Attention::insert(['key' => "Order", 'name' => "Pedido"]);
        Attention::insert(['key' => "Subsidiary", 'name' => "Sucursal"]);
    }
}
