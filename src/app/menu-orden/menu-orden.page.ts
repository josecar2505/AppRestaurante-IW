import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { ComServiceService } from '../services/order.service';


@Component({
  selector: 'app-menu-orden',
  templateUrl: './menu-orden.page.html',
  styleUrls: ['./menu-orden.page.scss'],
})

export class MenuOrdenPage implements OnInit {
  numeroMesa: number = 0;
  userData: any;

  public products: Product[] = [];
  public productsFounds: Product[] = [];

  constructor(private router: Router, private productService: ProductService, 
    private comServiceService: ComServiceService,
    private authService: AuthService, private alertController: AlertController, 
    ) {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.productsFounds = this.products;
    });
  }
  

  openProductAddPage() {
    this.router.navigate(['/add-product']); // Asume que la ruta 'product-add' existe para añadir productos.
  }

  isGerente(): boolean {
    // Asumiendo que tienes un método en tu servicio de autenticación para obtener el rol del usuario
    //console.log(this.authService.getUserData().type);
    return this.authService.getUserData().type == "administrador";
  }

  public gotomesas() {
    this.router.navigate(['/home']);
  }
    
  public gotocomanda() {
    this.router.navigate(['/comanda']);
  }
  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public filter = [
    ""
  ]

  public filterProducts(): void {
    console.log(this.filter);
    this.productsFounds = this.products.filter(
      item => {
        return this.filter.includes(item.type);
      }
    );
  }

  async deleteProduct(product: Product) {
    const alert = await this.alertController.create({
      header: 'Eliminar Producto',
      message: `¿deseas eliminar?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: (data) => {
            this.productService.deleteProduct(product).then(() => {
              console.log("Producto eliminado correctamente");
            }).catch((error) => {
              console.log("Error al eliminar el producto" + error);
            }); 
          },
        },
      ],
    });
  
    await alert.present();
  }

  public openActProductPage(rut : string, product: Product) {
    this.productService.setProductAct(product);
    this.router.navigate([rut]);
  }
  ngOnInit() {
    this.userData = this.authService.getUserData();
  }

  public addToOrder(product: Product, i: number) {
    product.photo = product.photo + i;
    console.log("Producto añadido a la mesa"+ this.comServiceService.numeroMesa);
    this.comServiceService.addToOrder(product);
  }

  public OrderVacia(): boolean {
    const order = this.comServiceService.getOrder();

    if(order.items.length == 0) {
      return true;
    } else {
      return false;
    }
  }







}


 

