import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderDoPage } from './order-do.page';

const routes: Routes = [
  {
    path: '',
    component: OrderDoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderDoPageRoutingModule {}
