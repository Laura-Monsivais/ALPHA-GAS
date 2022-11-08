import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderDetailPageRoutingModule } from './order-detail-routing.module';
import { OrderDetailPage } from './order-detail.page';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { OrderDetailListComponent } from './order-detail-list/order-detail-list.component';
import { OrderDetailTableComponent } from './order-detail-table/order-detail-table.component';
import { ProductPageModule } from '../product/product.module';
import { PromotionPageModule } from '../promotion/promotion.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderDetailPageRoutingModule,
    MDBBootstrapModule,
    ProductPageModule,
    PromotionPageModule
  ],
  declarations: [OrderDetailPage, OrderDetailListComponent, OrderDetailTableComponent],
  exports: [OrderDetailListComponent, OrderDetailTableComponent]
})
export class OrderDetailPageModule {}
