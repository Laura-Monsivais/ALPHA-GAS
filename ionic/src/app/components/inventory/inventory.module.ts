import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InventoryPageRoutingModule } from './inventory-routing.module';
import { InventoryPage } from './inventory.page';
import { NavbarPageModule } from '../navbar/navbar.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { InventoryTableComponent } from './inventory-table/inventory-table.component';
import { InventoryConsultComponent } from './inventory-consult/inventory-consult.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryPageRoutingModule,
    MDBBootstrapModule,
    MatTabsModule,
    NavbarPageModule
  ],
  declarations: [InventoryPage, InventoryTableComponent, InventoryConsultComponent]
})
export class InventoryPageModule {}
