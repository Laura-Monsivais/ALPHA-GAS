import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserPageRoutingModule } from './user-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatTabsModule } from '@angular/material/tabs';
import { NavbarPageModule } from '../navbar/navbar.module';
import { UserPage } from './user.page';
import { UserFormComponent } from './user-form/user-form.component';
import { UserInsertComponent } from './user-insert/user-insert.component';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { UserCoverComponent } from './user-cover/user-cover.component';
import { UserTableComponent } from './user-table/user-table.component';
import { UserConsultComponent } from './user-consult/user-consult.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SessionPageModule } from '../session/session.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    MDBBootstrapModule,
    MatTabsModule,
    NavbarPageModule,
    SessionPageModule,
  ],
  declarations: [UserPage, 
    UserFormComponent, 
    UserInsertComponent, 
    UserAvatarComponent, 
    UserCoverComponent, 
    UserTableComponent, 
    UserConsultComponent,
    UserUpdateComponent, 
    UserProfileComponent],
  exports: [UserProfileComponent]
})
export class UserPageModule {}
