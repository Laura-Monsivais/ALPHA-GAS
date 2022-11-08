import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ServicePageRoutingModule } from './service-routing.module';
import { ServicePage } from './service.page';
import { MatTabsModule } from '@angular/material/tabs';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ServiceInsertComponent } from './service-insert/service-insert.component';
import { ServiceFormComponent } from './service-form/service-form.component';
import { ServiceTableComponent } from './service-table/service-table.component';
import { ServiceUpdateComponent } from './service-update/service-update.component';
import { NavbarPageModule } from '../navbar/navbar.module';
import { ServiceConsultComponent } from './service-consult/service-consult.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceInfoComponent } from './service-info/service-info.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicePageRoutingModule,
    MDBBootstrapModule,
    MatTabsModule,
    NavbarPageModule,
  ],
  declarations: [
    ServicePage,
    ServiceInsertComponent,
    ServiceFormComponent,
    ServiceTableComponent,
    ServiceUpdateComponent,
    ServiceConsultComponent,
    ServiceListComponent,
    ServiceInfoComponent
  ],
  exports:[ServiceListComponent,
    ServiceInfoComponent]
})
export class ServicePageModule {}
