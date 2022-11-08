import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SessionPageRoutingModule } from './session-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatListModule } from '@angular/material/list';
import { SessionPage } from './session.page';
import { SessionTableComponent } from './session-table/session-table.component';
import { SessionListComponent } from './session-list/session-list.component';
import { SessionInfoComponent } from './session-info/session-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SessionPageRoutingModule,
    MDBBootstrapModule,
    MatListModule,
  ],
  declarations: [SessionPage,
    SessionTableComponent,
    SessionListComponent,
    SessionInfoComponent],
  exports: [SessionTableComponent, SessionListComponent,
    SessionInfoComponent]
})
export class SessionPageModule {}
