<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use App\Models\Subsidiary;

class SubsidiarySeeder extends Seeder
{
    /**
     * The name of the seeder corresponding model.
     *
     * @var string
     */
    protected $model = Subsidiary::class;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /* Sucursales */
        $subsidiary = new Subsidiary;
        //$subsidiary->id = 1;
        $subsidiary->name = 'Zacatecas';
        $subsidiary->is_central = 0;
        $subsidiary->street = 'Rodolfo Diesel';
        $subsidiary->exterior = '114';
        $subsidiary->postal_code = '98057';
        $subsidiary->neighborhood = 'Mecanicos';
        $subsidiary->city = 'Zacatecas';
        $subsidiary->municipality = 'Zacatecas';
        $subsidiary->state = 'Zacatecas';
        $subsidiary->country = 'México';
        $subsidiary->business_id = 1;
        $subsidiary->save();

        $subsidiary = new Subsidiary;
        //$subsidiary->id = 2;
        $subsidiary->name = 'Pinos';
        $subsidiary->is_central = 0;
        $subsidiary->street = 'Javier Mina';
        $subsidiary->exterior = 'S/N';
        $subsidiary->postal_code = '98920';
        $subsidiary->neighborhood = 'Centro';
        $subsidiary->city = '-';
        $subsidiary->municipality = 'Pinos';
        $subsidiary->state = 'Zacatecas';
        $subsidiary->country = 'México';
        $subsidiary->business_id = 2;
        $subsidiary->save();

        $subsidiary = new Subsidiary;
        //$subsidiary->id = 3
        $subsidiary->name = 'Tepetongo';
        $subsidiary->is_central = 0;
        $subsidiary->street = 'Carretera Jerez a Tepetongo Km 52.5';
        $subsidiary->exterior = 'S/N';
        $subsidiary->postal_code = '99570';
        $subsidiary->neighborhood = 'Tepetongo';
        $subsidiary->city = '-';
        $subsidiary->municipality = 'Tepetongo';
        $subsidiary->state = 'Zacatecas';
        $subsidiary->country = 'México';
        $subsidiary->business_id = 2;
        $subsidiary->save();

        $subsidiary = new Subsidiary;
        //$subsidiary->id = 4
        $subsidiary->name = 'Guadalupe';
        $subsidiary->is_central = 0;
        $subsidiary->street = 'Secretaría de programación y presupuesto';
        $subsidiary->exterior = '08';
        $subsidiary->postal_code = '98658';
        $subsidiary->neighborhood = 'Cieneguitas';
        $subsidiary->city = '-';
        $subsidiary->municipality = 'Guadalupe';
        $subsidiary->state = 'Zacatecas';
        $subsidiary->country = 'México';
        $subsidiary->business_id = 2;
        $subsidiary->save();

        $subsidiary = new Subsidiary;
        //$subsidiary->id = 5
        $subsidiary->name = 'Hacienda Nueva';
        $subsidiary->is_central = 0;
        $subsidiary->street = 'Carretera Zacatecas a Fresnillo Km 10.914';
        $subsidiary->exterior = 'S/N';
        $subsidiary->postal_code = '98100';
        $subsidiary->neighborhood = 'Hacienda Nueva';
        $subsidiary->city = '-';
        $subsidiary->municipality = 'Morelos';
        $subsidiary->state = 'Zacatecas';
        $subsidiary->country = 'México';
        $subsidiary->business_id = 2;
        $subsidiary->save();

        $subsidiary = new Subsidiary;
        //$subsidiary->id = 6
        $subsidiary->name = 'Fresnillo';       
        $subsidiary->is_central = 0;     
        $subsidiary->street = 'Jardín Madero';
        $subsidiary->exterior = '20';
        $subsidiary->postal_code = '99000';
        $subsidiary->neighborhood = 'Fresnillo Centro';
        $subsidiary->city = 'Fresnillo';
        $subsidiary->municipality = 'Fresnillo';
        $subsidiary->state = 'Zacatecas';
        $subsidiary->country = 'México';
        $subsidiary->business_id = 3;
        $subsidiary->save();

        $subsidiary = new Subsidiary;
        //$subsidiary->id = 7
        $subsidiary->name = 'Zacatecas';
        $subsidiary->is_central = 0;
        $subsidiary->street = 'Carretera Jerez Zacatecas Km 2';
        $subsidiary->exterior = 'S/N';
        $subsidiary->postal_code = '99300';
        $subsidiary->neighborhood = 'Jerez Centro';
        $subsidiary->city = 'Jerez de García Salinas';
        $subsidiary->municipality = 'Jerez';
        $subsidiary->state = 'Zacatecas';
        $subsidiary->country = 'México';
        $subsidiary->business_id = 3;
        $subsidiary->save();

        $subsidiary = new Subsidiary;
        //$subsidiary->id = 8
        $subsidiary->name = 'Zacatecas';
        $subsidiary->is_central = 0;
        $subsidiary->street = 'Desconocida';
        $subsidiary->exterior = 'S/N';
        $subsidiary->postal_code = 'Desconocido';
        $subsidiary->neighborhood = 'Desconocida';
        $subsidiary->city = 'Desconocida';
        $subsidiary->municipality = 'Desconocido';
        $subsidiary->state = 'Zacatecas';
        $subsidiary->country = 'México';
        $subsidiary->business_id = 4;
        $subsidiary->save();

        $subsidiary = new Subsidiary;
        //$subsidiary->id = 9
        $subsidiary->name = 'Aguascalientes';
        $subsidiary->is_central = 0;
        $subsidiary->street = 'Sierra de Tepoztlan';
        $subsidiary->exterior = 'S/N';
        $subsidiary->postal_code = '20130';
        $subsidiary->neighborhood = 'Bosques del Prado Sur';
        $subsidiary->city = 'Aguascalientes';
        $subsidiary->municipality = 'Aguascalientes';
        $subsidiary->state = 'Aguascalientes';
        $subsidiary->country = 'México';
        $subsidiary->business_id = 6;
        $subsidiary->save();

        $subsidiary = new Subsidiary;
        //$subsidiary->id = 10
        $subsidiary->name = 'Jalpa';
        $subsidiary->is_central = 0;
        $subsidiary->street = 'Desconocida';
        $subsidiary->exterior = 'S/N';
        $subsidiary->postal_code = 'Desconocido';
        $subsidiary->neighborhood = 'Desconocida';
        $subsidiary->city = 'Desconocida';
        $subsidiary->municipality = 'Desconocido';
        $subsidiary->state = 'Zacatecas';
        $subsidiary->country = 'México';
        $subsidiary->business_id = 7;
        $subsidiary->save();

        /* Centrales */
        $subsidiary = new Subsidiary;
        $subsidiary->name = 'Jerez';
        $subsidiary->is_central = 1;
        $subsidiary->street = 'Desconocida';
        $subsidiary->exterior = 'S/N';
        $subsidiary->postal_code = 'Desconocido';
        $subsidiary->neighborhood = 'Desconocida';
        $subsidiary->city = 'Desconocida';
        $subsidiary->municipality = 'Desconocido';
        $subsidiary->state = 'Zacatecas';
        $subsidiary->country = 'México';
        $subsidiary->business_id = 3;
        $subsidiary->save();

        $subsidiary = new Subsidiary;
        $subsidiary->name = 'Villa de Cos';
        $subsidiary->is_central = 1;
        $subsidiary->street = 'Desconocida';
        $subsidiary->exterior = 'S/N';
        $subsidiary->postal_code = 'Desconocido';
        $subsidiary->neighborhood = 'Desconocida';
        $subsidiary->city = 'Desconocida';
        $subsidiary->municipality = 'Desconocido';
        $subsidiary->state = 'Zacatecas';
        $subsidiary->country = 'México';
        $subsidiary->business_id = 4;
        $subsidiary->save();

        $subsidiary = new Subsidiary;
        $subsidiary->name = 'San Juan';
        $subsidiary->is_central = 1;
        $subsidiary->street = 'Desconocida';
        $subsidiary->exterior = 'S/N';
        $subsidiary->postal_code = 'Desconocido';
        $subsidiary->neighborhood = 'Desconocida';
        $subsidiary->city = 'Desconocida';
        $subsidiary->municipality = 'Desconocido';
        $subsidiary->state = 'Zacatecas';
        $subsidiary->country = 'México';
        $subsidiary->business_id = 5;
        $subsidiary->save();

        $subsidiary = new Subsidiary;
        $subsidiary->name = 'Teocaltiche';
        $subsidiary->is_central = 1;
        $subsidiary->street = 'Desconocida';
        $subsidiary->exterior = 'S/N';
        $subsidiary->postal_code = 'Desconocido';
        $subsidiary->neighborhood = 'Desconocida';
        $subsidiary->city = 'Desconocida';
        $subsidiary->municipality = 'Desconocido';
        $subsidiary->state = 'Jalisco';
        $subsidiary->country = 'México';
        $subsidiary->business_id = 6;
        $subsidiary->save();

        $subsidiary = new Subsidiary;
        $subsidiary->name = 'Villa Hidalgo';
        $subsidiary->is_central = 1;
        $subsidiary->street = 'Desconocida';
        $subsidiary->exterior = 'S/N';
        $subsidiary->postal_code = 'Desconocido';
        $subsidiary->neighborhood = 'Desconocida';
        $subsidiary->city = 'Desconocida';
        $subsidiary->municipality = 'Desconocido';
        $subsidiary->state = 'Jalisco';
        $subsidiary->country = 'México';
        $subsidiary->business_id = 6;
        $subsidiary->save();        

        $subsidiary = new Subsidiary;
        $subsidiary->name = 'Tlaltenango';
        $subsidiary->is_central = 1;
        $subsidiary->street = 'Desconocida';
        $subsidiary->exterior = 'S/N';
        $subsidiary->postal_code = 'Desconocido';
        $subsidiary->neighborhood = 'Desconocida';
        $subsidiary->city = 'Desconocida';
        $subsidiary->municipality = 'Desconocido';
        $subsidiary->state = 'Zacatecas';
        $subsidiary->country = 'México';
        $subsidiary->business_id = 7;
        $subsidiary->save();
        
        if (App::environment('local')) {
            factory(Subsidiary::class, 5)->create();
        }
    }
}
