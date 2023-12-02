import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

import { ComServiceService } from '../services/order.service';
import {Order, OrderItem} from '../models/order.model';
import { Product } from '../models/product.model';



@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.page.html',
  styleUrls: ['./comanda.page.scss'],
})
export class ComandaPage implements OnInit {

  public order : Order;
  constructor(private router: Router, private authService: AuthService, 
    private comServiceService: ComServiceService, 
    private alertController: AlertController) {
        this.order = this.comServiceService.getOrder();
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

}
