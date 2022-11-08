import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EnterprisePageRoutingModule } from './enterprise-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatTabsModule } from '@angular/material/tabs';
import { NavbarPageModule } from '../navbar/navbar.module';
import { BusinessPageModule } from '../business/business.module';
import { EnterprisePage } from './enterprise.page';
import { EnterpriseLogoComponent } from './enterprise-logo/enterprise-logo.component';
import { EnterpriseOverlayComponent } from './enterprise-overlay/enterprise-overlay.component';
import { EnterpriseFormComponent } from './enterprise-form/enterprise-form.component';
import { EnterpriseInsertComponent } from './enterprise-insert/enterprise-insert.component';
import { EnterpriseTableComponent } from './enterprise-table/enterprise-table.component';
import { EnterpriseConsultComponent } from './enterprise-consult/enterprise-consult.component';
import { EnterpriseUpdateComponent } from './enterprise-update/enterprise-update.component';
import { EnterpriseProfileComponent } from './enterprise-profile/enterprise-profile.component';
import { SubsidiaryPageModule } from '../subsidiary/subsidiary.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnterprisePageRoutingModule,
    MDBBootstrapModule,
    MatTabsModule,
    NavbarPageModule,
    BusinessPageModule,
    SubsidiaryPageModule
  ],
  declarations: [EnterprisePage, 
    EnterpriseLogoComponent, 
    EnterpriseOverlayComponent, 
    EnterpriseFormComponent, 
    EnterpriseInsertComponent,
    EnterpriseTableComponent,
    EnterpriseConsultComponent,
    EnterpriseUpdateComponent,
    EnterpriseProfileComponent],
  exports: [EnterpriseProfileComponent]
})
export class EnterprisePageModule {}
