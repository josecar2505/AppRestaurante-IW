import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuOrdenPageRoutingModule } from './menu-orden-routing.module';

import { MenuOrdenPage } from './menu-orden.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuOrdenPageRoutingModule
  ],
  declarations: [MenuOrdenPage]
})
export class MenuOrdenPageModule {}
