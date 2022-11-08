import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderDetailDoPage } from './order-detail-do.page';

const routes: Routes = [
  {
    path: '',
    component: OrderDetailDoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderDetailDoPageRoutingModule {}
