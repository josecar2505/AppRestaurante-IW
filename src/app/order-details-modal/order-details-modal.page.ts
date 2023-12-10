import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Order } from '../models/order.model';
import { ComServiceService } from '../services/order.service';

@Component({
  selector: 'app-order-details-modal',
  templateUrl: 'order-details-modal.page.html',
  styleUrls: ['order-details-modal.page.scss'],
})
export class OrderDetailsModalPage {
  @Input()
  order!: Order;
  @Input() paymentAmount!: number; // Add this line
  @Input() changeAmount!: number; 

  constructor(private modalController: ModalController, private comServiceService: ComServiceService, private router: Router) {}

  registrarMesa() {
    this.comServiceService.saveMesa();
    this.comServiceService.liberarMesa();
    this.modalController.dismiss();
    this.router.navigate(['home']);
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
