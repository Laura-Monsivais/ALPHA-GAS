import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalePage } from './sale.page';

const routes: Routes = [
  {
    path: '',
    component: SalePage
  },
  {
    path: 'sale-detail',
    loadChildren: () => import('../sale-detail/sale-detail.module').then( m => m.SaleDetailPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalePageRoutingModule {}
