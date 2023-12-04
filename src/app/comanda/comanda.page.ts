import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

import { ComServiceService } from '../services/order.service';
import {Order, OrderItem} from '../models/order.model';
import { Product } from '../models/product.model';

import { OrderDetailsModalPage } from '../order-details-modal/order-details-modal.page';
import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.page.html',
  styleUrls: ['./comanda.page.scss'],
  providers: [ModalController],
})
export class ComandaPage implements OnInit {

  public order : Order;
  constructor(private router: Router, private authService: AuthService, 
    private comServiceService: ComServiceService, 
    private alertController: AlertController,
    private modalController: ModalController
  ) {
    this.order = this.comServiceService.getOrder();
  }

  


  async mostrarTicket() {
  const order = this.comServiceService.getOrder();

  const modal = await this.modalController.create({
    component: OrderDetailsModalPage,
    componentProps: {
      order: order,
    },
    cssClass: 'order-details-modal' // Agrega una clase de estilo personalizado si es necesario
  });

  await modal.present();
}
    
    
  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public gotomesas() {
    this.router.navigate(['/home']);
  }
  public gotomenu() {
    this.router.navigate(['/menu-orden']);
  }

  public NumMesa(){
    return this.comServiceService.numeroMesa;
  }

  ngOnInit() {
  }

  async promptRemoveItem(item: OrderItem) {
    const alert = await this.alertController.create({
      header: 'Eliminar Producto',
      message: `¿Cuántos ${item.product.name} deseas eliminar?`,
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          min: 1,
          max: item.quantity,
          value: '1', // Valor predeterminado
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: (data) => {
            const quantityToRemove = parseInt(data.quantity, 10);
            if (quantityToRemove > 0) {
              this.comServiceService.removeItemFromCart(item, quantityToRemove);
            }
          },
        },
      ],
    });
  
    await alert.present();
  }

  public addItem(item: OrderItem) {
    this.comServiceService.addItemToCart(item);
  }

  public removeAnItem(item: OrderItem) {
    this.comServiceService.removeAnItem(item);
  }


}
