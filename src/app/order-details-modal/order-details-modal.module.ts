import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderDetailsModalPageRoutingModule } from './order-details-modal-routing.module';

import { OrderDetailsModalPage } from './order-details-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderDetailsModalPageRoutingModule
  ],
  declarations: [OrderDetailsModalPage]
})
export class OrderDetailsModalPageModule {}
