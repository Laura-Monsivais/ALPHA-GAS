<?php

use Illuminate\Database\Seeder;
use Symfony\Component\HttpKernel\DependencyInjection\ServicesResetter;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RolSeeder::class);//IMPORTAT
        $this->call(AttentionSeeder::class);//IMPORTANT
        $this->call(EnterpriseSeeder::class);
        $this->call(BusinessSeeder::class);
        $this->call(SubsidiarySeeder::class);/**/
        //ExternalApi
        $this->call(ServiceSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(ProductSeeder::class);/**/
        $this->call(PromotionSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(SessionSeeder::class);
        $this->call(UpdateUserSeed::class);
        $this->call(RouteTypeSeeder::class);
        $this->call(RouteSeeder::class);
        $this->call(BuySeeder::class);
        $this->call(BuyDetailSeeder::class);/**/
        //TransferOut/**/
        //TransferIn/**/
        $this->call(AddressSeeder::class);
        $this->call(OrderSeeder::class);
        $this->call(OrderDetailSeeder::class);
        $this->call(SaleSeeder::class);
        $this->call(SaleDetailSeeder::class);/**/
        //Selfconsumption/**/
        //Donation/**/
    }
}
