import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExternalApiPage } from './external-api.page';

const routes: Routes = [
  {
    path: '',
    component: ExternalApiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExternalApiPageRoutingModule {}
