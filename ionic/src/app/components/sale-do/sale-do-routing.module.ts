import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaleDoPage } from './sale-do.page';

const routes: Routes = [
  {
    path: '',
    component: SaleDoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaleDoPageRoutingModule {}
