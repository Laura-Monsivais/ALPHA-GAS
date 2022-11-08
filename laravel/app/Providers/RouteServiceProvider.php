<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\Http\Controllers';

    /**
     * The path to the "home" route for your application.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        //

        parent::boot();
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapApiRoutes();

        $this->mapWebRoutes();

        //
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
             ->namespace($this->namespace)
             ->group(base_path('routes/web.php'));
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
             ->middleware('api')
             ->namespace($this->namespace)
             ->group(function () {
                require base_path('routes/api.php');
                require base_path('routes/inside/attention.php');
                require base_path('routes/inside/address.php');
                require base_path('routes/inside/attention.php');
                require base_path('routes/inside/business.php');
                require base_path('routes/inside/buy.php');
                require base_path('routes/inside/buyDetail.php');
                require base_path('routes/inside/category.php');
                require base_path('routes/inside/dashboard.php');
                require base_path('routes/inside/donation.php');
                require base_path('routes/inside/enterprise.php');
                require base_path('routes/inside/externalApi.php');
                require base_path('routes/inside/inventory.php');
                require base_path('routes/inside/log.php');
                require base_path('routes/inside/order.php');
                require base_path('routes/inside/orderDetail.php');
                require base_path('routes/inside/promotion.php');
                require base_path('routes/inside/product.php');
                require base_path('routes/inside/rol.php');
                require base_path('routes/inside/routesubsidiary.php');
                require base_path('routes/inside/route.php');
                require base_path('routes/inside/routePlace.php');
                require base_path('routes/inside/routeType.php');
                require base_path('routes/inside/transfer.php');
                require base_path('routes/inside/sale.php');
                require base_path('routes/inside/saleDetail.php');
                require base_path('routes/inside/selfconsumptionroute.php');
                require base_path('routes/inside/service.php');
                require base_path('routes/inside/session.php');
                require base_path('routes/inside/user.php');
                require base_path('routes/outside/enterprise.php');
            });
    }
}
