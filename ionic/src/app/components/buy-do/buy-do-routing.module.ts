import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyDoPage } from './buy-do.page';

const routes: Routes = [
  {
    path: '',
    component: BuyDoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyDoPageRoutingModule {}
