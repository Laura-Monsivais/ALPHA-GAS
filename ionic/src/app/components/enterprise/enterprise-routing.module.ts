import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterprisePage } from './enterprise.page';

const routes: Routes = [
  {
    path: '',
    component: EnterprisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterprisePageRoutingModule {}
