import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SaleDetailPageRoutingModule } from './sale-detail-routing.module';
import { SaleDetailPage } from './sale-detail.page';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SaleDetailTableComponent } from './sale-detail-table/sale-detail-table.component';
import { SaleDetailListComponent } from './sale-detail-list/sale-detail-list.component';
import { SaleDetailDoComponent } from './sale-detail-do/sale-detail-do.component';
import { ProductPageModule } from '../product/product.module';
import { PromotionPageModule } from '../promotion/promotion.module';
import { ServicePageModule } from '../service/service.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaleDetailPageRoutingModule,
    MDBBootstrapModule,
    ProductPageModule,
    PromotionPageModule,
    ServicePageModule
  ],
  declarations: [SaleDetailPage, SaleDetailTableComponent, SaleDetailListComponent, SaleDetailDoComponent],
  exports: [SaleDetailTableComponent, SaleDetailDoComponent]
})
export class SaleDetailPageModule {}
