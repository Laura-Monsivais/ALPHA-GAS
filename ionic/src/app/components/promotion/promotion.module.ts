import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PromotionPageRoutingModule } from './promotion-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { NavbarPageModule } from '../navbar/navbar.module';
import { PromotionPage } from './promotion.page';
import { PromotionFormComponent } from './promotion-form/promotion-form.component';
import { PromotionInsertComponent } from './promotion-insert/promotion-insert.component';
import { PromotionTableComponent } from './promotion-table/promotion-table.component';
import { PromotionCardComponent } from './promotion-card/promotion-card.component';
import { PromotionInfoComponent } from './promotion-info/promotion-info.component';
import { PromotionConsultComponent } from './promotion-consult/promotion-consult.component';
import { PromotionUpdateComponent } from './promotion-update/promotion-update.component';
import { PromotionListComponent } from './promotion-list/promotion-list.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PromotionPageRoutingModule, 
    MDBBootstrapModule,
    MatListModule,
    MatTabsModule,
    NavbarPageModule
  ],
  declarations: [PromotionPage, 
    PromotionFormComponent, 
    PromotionInsertComponent, 
    PromotionTableComponent, 
    PromotionCardComponent, 
    PromotionInfoComponent,
    PromotionConsultComponent,
    PromotionUpdateComponent,
    PromotionListComponent],
  exports: [PromotionListComponent, PromotionInfoComponent]
})
export class PromotionPageModule {}
