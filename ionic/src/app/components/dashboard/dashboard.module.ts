import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';
import { NavbarPageModule } from '../navbar/navbar.module';
import { ChartsModule, MDBBootstrapModule, WavesModule } from 'angular-bootstrap-md';
import { SubsidiariesSalesComponent } from './chart/line/subsidiaries-sales/subsidiaries-sales.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    MDBBootstrapModule, 
    NavbarPageModule,
    ChartsModule,
    WavesModule
  ],
  declarations: [DashboardPage, SubsidiariesSalesComponent]  
})
export class DashboardPageModule {}
