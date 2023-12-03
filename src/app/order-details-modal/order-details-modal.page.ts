import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-order-details-modal',
  templateUrl: 'order-details-modal.page.html',
  styleUrls: ['order-details-modal.page.scss'],
})
export class OrderDetailsModalPage {
  @Input()
  order!: Order;

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }
}
