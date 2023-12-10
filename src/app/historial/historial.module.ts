import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatePipe } from '@angular/common';
import { HistorialPageRoutingModule } from './historial-routing.module';
import { HistorialPage } from './historial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialPageRoutingModule
  ],
  declarations: [HistorialPage],
  providers: [DatePipe],
})
export class HistorialPageModule {}
