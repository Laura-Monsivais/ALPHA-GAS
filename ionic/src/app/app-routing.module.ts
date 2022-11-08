import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthenticationGuard } from "./guards/authentication.guard";
import { BusinessGuard } from "./guards/business.guard";
import { BuyGuard } from "./guards/buy.guard";
import { CategoryGuard } from "./guards/category.guard";
import { ExternalApiGuard } from "./guards/external-api.guard";
import { DonationGuard } from "./guards/donation.guard";
import { OrderGuard } from "./guards/order.guard";
import { ProductGuard } from "./guards/product.guard";
import { PromotionGuard } from "./guards/promotion.guard";
import { RouteGuard } from "./guards/routes.guard";
import { SaleGuard } from "./guards/sale.guard";
import { SelfConsumptionGuard } from "./guards/self-consumption.guard";
import { ServiceGuard } from "./guards/service.guard";
import { SubsidiaryGuard } from "./guards/subsidiary.guard";
import { UserGuard } from "./guards/user.guard";
import { EnterpriseGuard } from "./guards/enterprise.guard";
import { TransferGuard } from "./guards/transfer.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./components/login/login.module").then((m) => m.LoginPageModule),
    pathMatch: "full",
  },
  {
    path: "configuration",
    loadChildren: () =>
      import("./components/configuration/configuration.module").then(
        (m) => m.ConfigurationPageModule
      ),
    canActivate: [AuthenticationGuard],
    pathMatch: "full",
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./components/dashboard/dashboard.module").then(
        (m) => m.DashboardPageModule
      ),
    canActivate: [AuthenticationGuard],
    pathMatch: "full",
  },
  {
    path: "orders",
    loadChildren: () =>
      import("./components/order/order.module").then((m) => m.OrderPageModule),
    canActivate: [AuthenticationGuard, OrderGuard],
    pathMatch: "full",
  },
  {
    path: "cart/:orderId",
    loadChildren: () =>
      import("./components/order-detail-do/order-detail-do.module")//@todo Cambiar a pagina pedido-carrito
      .then((m) => m.OrderDetailDoPageModule),
    canActivate: [AuthenticationGuard, OrderGuard],
    pathMatch: "full",
  },
  {
    path: "delivery/:orderId",
    loadChildren: () =>
      import("./components/order-do/order-do.module")//@todo Cambiar a pagina pedido-entrega
      .then((m) => m.OrderDoPageModule),
    canActivate: [AuthenticationGuard, OrderGuard],
    pathMatch: "full",
  },
  {
    path: "sales",
    loadChildren: () =>
      import("./components/sale/sale.module").then((m) => m.SalePageModule),
    canActivate: [AuthenticationGuard, SaleGuard],
    pathMatch: "full",
  },
  {
    path: "sales/:getSales",
    loadChildren: () =>
      import("./components/sale/sale.module").then((m) => m.SalePageModule),
    canActivate: [AuthenticationGuard, SaleGuard],
    pathMatch: "full",
  },
  {
    path: "sale-do/:saleId",
    loadChildren: () =>
      import("./components/sale-do/sale-do.module").then(
        (m) => m.SaleDoPageModule
      ),
    canActivate: [AuthenticationGuard],
    pathMatch: "full",
  },
  {
    path: "promotions",
    loadChildren: () =>
      import("./components/promotion/promotion.module").then(
        (m) => m.PromotionPageModule
      ),
    canActivate: [AuthenticationGuard, PromotionGuard],
    pathMatch: "full",
  },
  {
    path: "categories",
    loadChildren: () =>
      import("./components/category/category.module").then(
        (m) => m.CategoryPageModule
      ),
    canActivate: [AuthenticationGuard, CategoryGuard],
    pathMatch: "full",
  },
  {
    path: "products",
    loadChildren: () =>
      import("./components/product/product.module").then(
        (m) => m.ProductPageModule
      ),
    canActivate: [AuthenticationGuard, ProductGuard],
    pathMatch: "full",
  },
  {
    path: "services",
    loadChildren: () =>
      import("./components/service/service.module").then(
        (m) => m.ServicePageModule
      ),
    canActivate: [AuthenticationGuard, ServiceGuard],
    pathMatch: "full",
  },
  {
    path: "external-apis",
    loadChildren: () =>
      import("./components/external-api/external-api.module").then(
        (m) => m.ExternalApiPageModule
      ),
    canActivate: [AuthenticationGuard, ExternalApiGuard],
  },
  {
    path: "routes",
    loadChildren: () =>
      import("./components/route/route.module").then((m) => m.RoutePageModule),
    canActivate: [AuthenticationGuard, RouteGuard],
    pathMatch: "full",
  },
  {
    path: "routes:getRoutes",
    loadChildren: () =>
      import("./components/route/route.module").then(
        (m) => m.RoutePageModule
      ),
    canActivate: [AuthenticationGuard,RouteGuard],
    pathMatch: "full",
  },
  {
    path: 'route-do/:routeId',
    loadChildren: () => import('./components/route-do/route-do.module').then( m => m.RouteDoPageModule),
    canActivate: [AuthenticationGuard,RouteGuard],
    pathMatch: "full",
  },
  {
    path: "users",
    loadChildren: () =>
      import("./components/user/user.module").then((m) => m.UserPageModule),
    canActivate: [AuthenticationGuard, UserGuard],
    pathMatch: "full",
  },
  {
    path: "enterprises",
    loadChildren: () =>
      import("./components/enterprise/enterprise.module").then(
        (m) => m.EnterprisePageModule
      ),
    canActivate: [AuthenticationGuard, EnterpriseGuard],
    pathMatch: "full",
  },
  {
    path: "businesses",
    loadChildren: () =>
      import("./components/business/business.module").then(
        (m) => m.BusinessPageModule
      ),
    canActivate: [AuthenticationGuard, BusinessGuard],
    pathMatch: "full",
  },
  {
    path: "subsidiaries",
    loadChildren: () =>
      import("./components/subsidiary/subsidiary.module").then(
        (m) => m.SubsidiaryPageModule
      ),
    canActivate: [AuthenticationGuard, SubsidiaryGuard],
    pathMatch: "full",
  },
  {
    path: "buys",
    loadChildren: () =>
      import("./components/buy/buy.module").then((m) => m.BuyPageModule),
    canActivate: [AuthenticationGuard, BuyGuard],
    pathMatch: "full",
  },
  {
    path: "buys/:getBuys",
    loadChildren: () =>
      import("./components/buy/buy.module").then((m) => m.BuyPageModule),
    canActivate: [AuthenticationGuard, BuyGuard],
    pathMatch: "full",
  },
  {
    path: "buy-do/:buyId",
    loadChildren: () =>
      import("./components/buy-do/buy-do.module").then(
        (m) => m.BuyDoPageModule
      ),
    canActivate: [AuthenticationGuard],
    pathMatch: "full",
  },
  {
    path: "buy-detail",
    loadChildren: () =>
      import("./components/buy-detail/buy-detail.module").then(
        (m) => m.BuyDetailPageModule
      ),
      canActivate: [AuthenticationGuard],
  },
  {
    path: "self-consumptions",
    loadChildren: () =>
      import("./components/self-consumption/self-consumption.module").then(
        (m) => m.SelfConsumptionPageModule
      ),
      canActivate: [AuthenticationGuard, SelfConsumptionGuard],
      pathMatch: "full",
  },
  {
    path: 'donations',
    loadChildren: () => import('./components/donation/donation.module').then( m => m.DonationPageModule),
    canActivate: [AuthenticationGuard, DonationGuard],
    pathMatch: "full",
  },
  {
    path: 'transfers',
    loadChildren: () => import('./components/transfer/transfer.module').then( m => m.TransferPageModule),
    canActivate: [AuthenticationGuard, TransferGuard],
    pathMatch: "full",
  },
  {
    path: 'inventories',
    loadChildren: () => import('./components/inventory/inventory.module').then( m => m.InventoryPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: "legacy",
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
