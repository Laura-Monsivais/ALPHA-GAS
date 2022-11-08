import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExternalApiPageRoutingModule } from './external-api-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatTabsModule } from '@angular/material/tabs';
import { NavbarPageModule } from '../navbar/navbar.module';
import { ExternalApiPage } from './external-api.page';
import { ExternalApiFormComponent } from './external-api-form/external-api-form.component';
import { ExternalApiInsertComponent } from './external-api-insert/external-api-insert.component';
import { ExternalApiTableComponent } from './external-api-table/external-api-table.component';
import { ExternalApiConsultComponent } from './external-api-consult/external-api-consult.component';
import { ExternalApiUpdateComponent } from './external-api-update/external-api-update.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExternalApiPageRoutingModule,
    MDBBootstrapModule,
    MatTabsModule,
    NavbarPageModule
  ],
  declarations: [ExternalApiPage,
    ExternalApiFormComponent,
    ExternalApiInsertComponent,
    ExternalApiTableComponent,
    ExternalApiConsultComponent,
    ExternalApiUpdateComponent]
})
export class ExternalApiPageModule {}
