import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderDetailsModalPage } from './order-details-modal.page';

const routes: Routes = [
  {
    path: '',
    component: OrderDetailsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderDetailsModalPageRoutingModule {}
