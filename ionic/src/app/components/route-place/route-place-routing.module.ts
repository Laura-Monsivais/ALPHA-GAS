import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoutePlacePage } from './route-place.page';

const routes: Routes = [
  {
    path: '',
    component: RoutePlacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutePlacePageRoutingModule {}
