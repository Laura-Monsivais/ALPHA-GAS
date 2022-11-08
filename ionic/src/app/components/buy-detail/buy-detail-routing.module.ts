import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyDetailPage } from './buy-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BuyDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyDetailPageRoutingModule {}
