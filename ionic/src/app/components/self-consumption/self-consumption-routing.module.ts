import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelfConsumptionPage } from './self-consumption.page';

const routes: Routes = [
  {
    path: '',
    component: SelfConsumptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfConsumptionPageRoutingModule {}
