import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Product } from '../models/product.model';
import { AuthService } from '../services/auth.service';
import { ComServiceService } from '../services/order.service';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-menu-orden',
  templateUrl: './menu-orden.page.html',
  styleUrls: ['./menu-orden.page.scss'],
})
export class MenuOrdenPage implements OnInit {
  userData: any;

  public products: Product[] = [];
  public productsFounds: Product[] = [];
  public filter: string = '';

  constructor(
    private router: Router,
    private productService: ProductService,
    private comServiceService: ComServiceService,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.userData = this.authService.getUserData();
    

    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.productsFounds = this.products;
    });
  }

  openProductAddPage() {
    this.router.navigate(['/add-product']);
  }

  isGerente(): boolean {
    return this.authService.getUserData().type == 'administrador';
  }

  gotomesas() {
    this.router.navigate(['/home']);
  }

  gotohistorial() {
    this.router.navigate(['/historial']);
  }

  gotocomanda() {
    this.router.navigate(['/comanda']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  filterProducts(type: string): void {
    // Toggle selection for the clicked button
    this.filter = this.filter === type ? '' : type;

    // Perform filtering logic here based on this.filter
    this.productsFounds = this.products.filter((item) => this.filter === '' || this.filter === item.type);
  }

  async deleteProduct(product: Product) {
    const alert = await this.alertController.create({
      header: 'Eliminar Producto',
      message: `¿Deseas eliminar el producto?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.productService
              .deleteProduct(product)
              .then(() => {
                console.log('Producto eliminado correctamente');
              })
              .catch((error) => {
                console.log('Error al eliminar el producto' + error);
              });
          },
        },
      ],
    });

    await alert.present();
  }

  openActProductPage(rut: string, product: Product) {
    this.productService.setProductAct(product);
    this.router.navigate([rut]);
  }

  addToOrder(product: Product, i: number) {
    product.photo = product.photo + i;
    console.log('Producto añadido a la mesa' + this.comServiceService.numeroMesa);
    this.comServiceService.addToOrder(product);
  }

  OrderVacia(): boolean {
    const order = this.comServiceService.getOrder();
    return order.items.length === 0;
  }
}
