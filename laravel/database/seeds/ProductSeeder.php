<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * The name of the seeder corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $product = new Product;
        //$product->id = 1;
        $product->name = 'Triplay Pino';
        $product->description = 'Triplay Pino. Medidas (Largo; Ancho; Profundidad): 2.44m X 1.22m X 3mm';
        $product->unit = 'Unidad(es)';
        $product->cost = 555.50;
        $product->price = 600.00;
        $product->business_id = 1;//MEJOR MADERA-MADERERÍA
        $product->category_id = 1;//MADERA
        $product->save();

        $product = new Product;
        //$product->id = 2;
        $product->name = 'Gasolina Magna';
        $product->unit = 'Litro(s)';
        $product->cost = 20.00;
        $product->price = 25.00;
        $product->business_id = 2;//PARADOR HACIENDA NUEVA-GASOLINERÍA
        $product->category_id = 2;//GASOLINA
        $product->save();
        $product = new Product;
        //$product->id = 3;
        $product->name = 'Gasolina Premium';
        $product->unit = 'Litro(s)';
        $product->cost = 22.00;
        $product->price = 27.00;
        $product->business_id = 2;//PARADOR HACIENDA NUEVA-GASOLINERÍA
        $product->category_id = 2;//GASOLINA
        $product->save();
        $product = new Product;
        //$product->id = 4;
        $product->name = 'Gasolina Diesel';
        $product->unit = 'Litro(s)';
        $product->cost = 23.00;
        $product->price = 28.00;
        $product->business_id = 2;//PARADOR HACIENDA NUEVA-GASOLINERÍA
        $product->category_id = 2;//GASOLINA
        $product->save();
        $product = new Product;
        //$product->id = 5;
        $product->name = 'Aceite Quaker State Multigrado';
        $product->content =  1.00;
        $product->unit = 'Litro(s)';
        $product->cost = 134.36;
        $product->price = 134.36;
        $product->business_id = 2;//PARADOR HACIENDA NUEVA-GASOLINERÍA
        $product->category_id = 3;//ACEITE
        $product->save();
        $product = new Product;
        //$product->id = 6;
        $product->name = 'Aceite Quaker State Máxima Potencia';
        $product->content =  0.50;
        $product->unit = 'Litro(s)';
        $product->cost = 64.90;
        $product->price = 64.90;
        $product->business_id = 2;//PARADOR HACIENDA NUEVA-GASOLINERÍA
        $product->category_id = 3;//ACEITE
        $product->save();
        $product = new Product;
        //$product->id = 7;
        $product->name = 'Aceite para motor Bardahl';
        $product->content =  0.50;
        $product->unit = 'Litro(s)';
        $product->cost = 64.90;
        $product->price = 64.90;
        $product->business_id = 2;//PARADOR HACIENDA NUEVA-GASOLINERÍA
        $product->category_id = 3;//ACEITE
        $product->save();
        $product = new Product;
        //$product->id = 8;
        $product->name = 'Aceite aditivo para diesel Bardahl';
        $product->content =  0.80;
        $product->unit = 'Litro(s)';
        $product->cost = 85.00;
        $product->price = 85.00;
        $product->business_id = 2;//PARADOR HACIENDA NUEVA-GASOLINERÍA
        $product->category_id = 3;//ACEITE
        $product->save();

        $product = new Product;
        //$product->id = 9;
        $product->name = 'Gas L.P. Cilindro doméstico';
        $product->description = 'Gas licuado del petróleo. Presentación: Cilindro doméstico. Es perfecto para lugares pequeños.';            
        $product->content =  30.00;
        $product->unit = 'Kilo(s)';
        $product->cost = 653.21;
        $product->price = 704.7;
        $product->business_id = 3;//GAS LUX-GASERA
        $product->category_id = 4;;//GAS DONACIÓN
        $product->save();
        $product = new Product;
        //$product->id = 10;
        $product->name = 'Gas L.P. Pipa';   
        $product->unit = 'Kilo(s)';
        $product->cost = 22.00;
        $product->price = 23.00;
        $product->business_id = 3;//GAS LUX-GASERA
        $product->category_id = 4;;//GAS DONACIÓN
        $product->save();
        $product = new Product;
        //$product->id = 11;
        $product->name = 'Gas L.P. Tanque estacionario doméstico';
        $product->content =  120.00;
        $product->unit = 'Kilo(s)';
        $product->cost = 6936.92;
        $product->price = 7936.92;
        $product->business_id = 3;//GAS LUX-GASERA
        $product->category_id = 5;//GAS AUTODONACIÓN
        $product->save();
        $product = new Product;
        //$product->id = 12;
        $product->name = 'Gas L.P. Tanque estacionario industrial';
        $product->content =  1000.00;
        $product->unit = 'Kilo(s)';
        $product->cost = 19036.92;
        $product->price = 20000.00;
        $product->business_id = 3;//GAS LUX-GASERA
        $product->category_id = 5;//GAS AUTODONACIÓN
        $product->save();
        $product = new Product;
        //$product->id = 13;
        $product->name = 'Gas L.P. Estación de carburación para vehículos';
        $product->unit = 'Kilo(s)';
        $product->cost = 16.00;
        $product->price = 17.00;
        $product->business_id = 3;//GAS LUX-GASERA
        $product->category_id = 5;//GAS AUTODONACIÓN
        $product->save();
        
        $product = new Product;
        //$product->id = 14;
        $product->name = 'Gas L.P. Cilindro doméstico';
        $product->description = 'Gas licuado del petróleo. Presentación: Cilindro doméstico. Es perfecto para lugares pequeños.';            
        $product->content =  30.00;
        $product->unit = 'Kilo(s)';
        $product->cost = 653.21;
        $product->price = 704.7;
        $product->business_id = 4;//AUREGAS-GASERA
        $product->category_id = 6;;//GAS DONACIÓN
        $product->save();
        $product = new Product;
        //$product->id = 15;
        $product->name = 'Gas L.P. Pipa';   
        $product->unit = 'Kilo(s)';
        $product->cost = 22.00;
        $product->price = 23.00;
        $product->business_id = 4;//AUREGAS-GASERA
        $product->category_id = 6;;//GAS DONACIÓN
        $product->save();
        $product = new Product;
        //$product->id = 16;
        $product->name = 'Gas L.P. Tanque estacionario doméstico';
        $product->content =  120.00;
        $product->unit = 'Kilo(s)';
        $product->cost = 6936.92;
        $product->price = 7936.92;
        $product->business_id = 4;//AUREGAS-GASERA
        $product->category_id = 7;;//GAS AUTOCONSUMO
        $product->save();
        $product = new Product;
        //$product->id = 17;
        $product->name = 'Gas L.P. Tanque estacionario industrial';
        $product->content =  1000.00;
        $product->unit = 'Kilo(s)';
        $product->cost = 19036.92;
        $product->price = 20000.00;
        $product->business_id = 4;//AUREGAS-GASERA
        $product->category_id = 7;;//GAS AUTOCONSUMO
        $product->save();
        $product = new Product;
        //$product->id = 18;
        $product->name = 'Gas L.P. Estación de carburación para vehículos';
        $product->unit = 'Kilo(s)';
        $product->cost = 16.00;
        $product->price = 17.00;
        $product->business_id = 4;//AUREGAS-GASERA
        $product->category_id = 7;;//GAS AUTOCONSUMO
        $product->save();        
        
        $product = new Product;
        //$product->id = 19;
        $product->name = 'Gas L.P. Cilindro doméstico';
        $product->description = 'Gas licuado del petróleo. Presentación: Cilindro doméstico. Es perfecto para lugares pequeños.';            
        $product->content =  30.00;
        $product->unit = 'Kilo(s)';
        $product->cost = 653.21;
        $product->price = 704.7;
        $product->business_id = 5;//GOTGAS-GASERA
        $product->category_id = 8;//GAS DONACIÓN
        $product->save();
        $product = new Product;
        //$product->id = 20;
        $product->name = 'Gas L.P. Pipa';   
        $product->unit = 'Kilo(s)';
        $product->cost = 22.00;
        $product->price = 23.00;
        $product->business_id = 5;//GOTGAS-GASERA
        $product->category_id = 8;//GAS DONACIÓN
        $product->save();
        $product = new Product;
        //$product->id = 21;
        $product->name = 'Gas L.P. Tanque estacionario doméstico';
        $product->content =  120.00;
        $product->unit = 'Kilo(s)';
        $product->cost = 6936.92;
        $product->price = 7936.92;
        $product->business_id = 5;//GOTGAS-GASERA
        $product->category_id = 9;//GAS AUTOCONSUMO
        $product->save();
        $product = new Product;
        //$product->id = 22;
        $product->name = 'Gas L.P. Tanque estacionario industrial';
        $product->content =  1000.00;
        $product->unit = 'Kilo(s)';
        $product->cost = 19036.92;
        $product->price = 20000.00;
        $product->business_id = 5;//GOTGAS-GASERA
        $product->category_id = 9;//GAS AUTOCONSUMO
        $product->save();
        $product = new Product;
        //$product->id = 23;
        $product->name = 'Gas L.P. Estación de carburación para vehículos';
        $product->unit = 'Kilo(s)';
        $product->cost = 16.00;
        $product->price = 17.00;
        $product->business_id = 5;//GOTGAS-GASERA
        $product->category_id = 9;//GAS AUTOCONSUMO
        $product->save();
        
        $product = new Product;
        //$product->id = 24;
        $product->name = 'Gas L.P. Cilindro doméstico';
        $product->description = 'Gas licuado del petróleo. Presentación: Cilindro doméstico. Es perfecto para lugares pequeños.';            
        $product->content =  30.00;
        $product->unit = 'Kilo(s)';
        $product->cost = 653.21;
        $product->price = 704.7;
        $product->business_id = 6;//ALFA GAS-GASERA
        $product->category_id = 10;//GAS DONACIÓN
        $product->save();
        $product = new Product;
        //$product->id = 25;
        $product->name = 'Gas L.P. Pipa';   
        $product->unit = 'Kilo(s)';
        $product->cost = 22.00;
        $product->price = 23.00;
        $product->business_id = 6;//ALFA GAS-GASERA
        $product->category_id = 10;//GAS DONACIÓN
        $product->save();
        $product = new Product;
        //$product->id = 26;
        $product->name = 'Gas L.P. Tanque estacionario doméstico';
        $product->content =  120.00;
        $product->unit = 'Kilo(s)';
        $product->cost = 6936.92;
        $product->price = 7936.92;
        $product->business_id = 6;//ALFA GAS-GASERA
        $product->category_id = 11;//GAS AUTOCONSUMO
        $product->save();
        $product = new Product;
        //$product->id = 27;
        $product->name = 'Gas L.P. Tanque estacionario industrial';
        $product->content =  1000.00;
        $product->unit = 'Kilo(s)';
        $product->cost = 19036.92;
        $product->price = 20000.00;
        $product->business_id = 6;//ALFA GAS-GASERA
        $product->category_id = 11;//GAS AUTOCONSUMO
        $product->save();
        $product = new Product;
        //$product->id = 28;
        $product->name = 'Gas L.P. Estación de carburación para vehículos';
        $product->unit = 'Kilo(s)';
        $product->cost = 16.00;
        $product->price = 17.00;
        $product->business_id = 6;//ALFA GAS-GASERA
        $product->category_id = 11;//GAS AUTOCONSUMO
        $product->save();
        
        $product = new Product;
        //$product->id = 29;
        $product->name = 'Gas L.P. Cilindro doméstico';
        $product->description = 'Gas licuado del petróleo. Presentación: Cilindro doméstico. Es perfecto para lugares pequeños.';            
        $product->content =  30.00;
        $product->unit = 'Kilo(s)';
        $product->cost = 653.21;
        $product->price = 704.7;
        $product->business_id = 7;//GAS DEL CAÑON-GASERA
        $product->category_id = 12;//GAS DONACIÓN
        $product->save();
        $product = new Product;
        //$product->id = 30;
        $product->name = 'Gas L.P. Pipa';   
        $product->unit = 'Kilo(s)';
        $product->cost = 22.00;
        $product->price = 23.00;
        $product->business_id = 7;//GAS DEL CAÑON-GASERA
        $product->category_id = 12;//GAS DONACIÓN
        $product->save();
        $product = new Product;
        //$product->id = 31;
        $product->name = 'Gas L.P. Tanque estacionario doméstico';
        $product->content =  120.00;
        $product->unit = 'Kilo(s)';
        $product->cost = 6936.92;
        $product->price = 7936.92;
        $product->business_id = 7;//GAS DEL CAÑON-GASERA
        $product->category_id = 13;//GAS AUTOCONSUMO
        $product->save();
        $product = new Product;
        //$product->id = 32;
        $product->name = 'Gas L.P. Tanque estacionario industrial';
        $product->content =  1000.00;
        $product->unit = 'Kilo(s)';
        $product->cost = 19036.92;
        $product->price = 20000.00;
        $product->business_id = 7;//GAS DEL CAÑON-GASERA
        $product->category_id = 13;//GAS AUTOCONSUMO
        $product->save();
        $product = new Product;
        //$product->id = 33;
        $product->name = 'Gas L.P. Estación de carburación para vehículos';
        $product->unit = 'Kilo(s)';
        $product->cost = 16.00;
        $product->price = 17.00;
        $product->business_id = 7;//GAS DEL CAÑON-GASERA
        $product->category_id = 13;//GAS AUTOCONSUMO
        $product->save();

        if (App::environment('local')) {
            factory(Product::class, 30)->create();
        }
    }
}
