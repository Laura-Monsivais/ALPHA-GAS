import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Chart } from 'chart.js';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AddressPageModule } from './components/address/address.module';
import { BusinessPageModule } from './components/business/business.module';
import { EnterprisePageModule } from './components/enterprise/enterprise.module';
import { NavbarPageModule } from './components/navbar/navbar.module';
import { OrderPageModule } from './components/order/order.module';
import { OrderDetailPageModule } from './components/order-detail/order-detail.module';
import { ProductPageModule } from './components/product/product.module';
import { PromotionPageModule } from './components/promotion/promotion.module';
import { RolPageModule } from './components/rol/rol.module';
import { RoutePageModule } from './components/route/route.module';
import { RoutePlacePageModule } from './components/route-place/route-place.module';
import { SalePageModule } from './components/sale/sale.module';
import { SaleDetailPageModule } from './components/sale-detail/sale-detail.module';
import { ServicePageModule } from './components/service/service.module';
import { SessionPageModule } from './components/session/session.module';
import { SubsidiaryPageModule } from './components/subsidiary/subsidiary.module';
import { UserPageModule } from './components/user/user.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    SweetAlert2Module,
    SweetAlert2Module.forChild({}),
    FormsModule,
    ReactiveFormsModule,    
    MDBBootstrapModule.forRoot(),
    AddressPageModule,
    BusinessPageModule,
    EnterprisePageModule,
    NavbarPageModule,
    OrderPageModule,
    OrderDetailPageModule,
    ProductPageModule,
    PromotionPageModule,
    RolPageModule,
    RoutePageModule,
    RoutePlacePageModule,
    SalePageModule,
    SaleDetailPageModule,
    ServicePageModule,
    SessionPageModule,
    SubsidiaryPageModule,
    UserPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthenticationGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
