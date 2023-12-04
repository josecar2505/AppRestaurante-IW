import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Order } from '../models/order.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ComServiceService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details-modal',
  templateUrl: 'order-details-modal.page.html',
  styleUrls: ['order-details-modal.page.scss'],
})
export class OrderDetailsModalPage {
  @Input()
  order!: Order;

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
