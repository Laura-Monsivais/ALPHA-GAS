import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SaleDoPageRoutingModule } from './sale-do-routing.module';
import { SaleDoPage } from './sale-do.page';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarPageModule } from '../navbar/navbar.module';
import { MdbModule } from 'mdb-angular-ui-kit';
import { SaleDoStepSecondComponent } from './sale-do-step-second/sale-do-step-second.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { SaleDoStepThirdComponent } from './sale-do-step-third/sale-do-step-third.component';
import { SaleDoStepFirstComponent } from './sale-do-step-first/sale-do-step-first.component';
import { SalePageModule } from '../sale/sale.module';
import { SessionPageModule } from '../session/session.module';
import { ProductPageModule } from '../product/product.module';
import { ServicePageModule } from '../service/service.module';
import { OrderPageModule } from '../order/order.module';
import { PromotionPageModule } from '../promotion/promotion.module';
import { SaleDetailPageModule } from '../sale-detail/sale-detail.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SaleDoPageRoutingModule,
    MDBBootstrapModule,
    NavbarPageModule,
    MdbModule,
    MatSliderModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    SessionPageModule,
    ProductPageModule,
    ServicePageModule,
    OrderPageModule,
    PromotionPageModule,
    SalePageModule,
    SaleDetailPageModule
  ],
  declarations: [
    SaleDoPage,
    SaleDoStepFirstComponent,
    SaleDoStepSecondComponent,
    SaleDoStepThirdComponent
  ]
})
export class SaleDoPageModule {}
