import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mesa, Order, OrderItem } from '../models/order.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ComServiceService {
  private mesaCollection: AngularFirestoreCollection<Mesa>;
  
  private mesas: Mesa[] = Array.from({ length: 6 }, (_, i) => ({
    numeroMesa: i + 1,
    order: { items: [], total: 0, itemCount: 0 },
    fecha: new Date(),
    status: true
  }));

  public numeroMesa: number = 0;
  

  getHistorialComandasByDateRange(startDate: Date, endDate: Date): Observable<Mesa[]> {
    console.log("inicio"+startDate + " fin" + endDate)
    return this.mesaCollection.valueChanges().pipe(
      map((mesas: Mesa[]) => {
        return mesas.filter((mesa) => {
          // Compara las fechas directamente
          return mesa.fecha >= startDate && mesa.fecha <= endDate;
          
        });
      })
    );
  }
  
  

  private get order(): Order {
    return this.mesas[this.numeroMesa - 1].order;
  }

  

  constructor(private firestore: AngularFirestore) {
    this.numeroMesa = 1; // Set a default value or initialize it based on your logic
    this.mesaCollection = this.firestore.collection<Mesa>('historialComandas');
  }

  public getOrder(): Order {
    return this.mesas[this.numeroMesa - 1].order;
  }

  public addToOrder(product: Product): Order {
    const currentMesa = this.mesas.find((mesa) => mesa.numeroMesa === this.numeroMesa);

    if (currentMesa !== undefined) {
      const existingOrderItem = currentMesa.order.items.find((item) => item.product.name === product.name);

      if (existingOrderItem) {
        existingOrderItem.quantity += 1;
      } else {
        const newItem: OrderItem = {
          product: product,
          quantity: 1,
        };
        currentMesa.order.items.push(newItem);
      }

      currentMesa.order.total = this.calculateTotal(currentMesa.order);
      currentMesa.order.itemCount = this.calculateItemCount(currentMesa.order);
      currentMesa.status = false;

      console.log(this.mesas);
      console.log(currentMesa.order);
      return currentMesa.order;
    } else {
      console.error(`No se encontró la mesa con el número ${this.numeroMesa}`);
      return this.order; // or handle the error accordingly
    }
  }

  private calculateTotal(order: Order): number {
    return order.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  private calculateItemCount(order: Order): number {
    return order.items.reduce((count, item) => count + item.quantity, 0);
  }

  public removeItemFromCart(item: OrderItem, quantityToRemove: number) {
    const index = this.order.items.findIndex((cartItem) => cartItem === item);
    if (index !== -1) {
      if (item.quantity > quantityToRemove) {
        item.quantity -= quantityToRemove;
      } else {
        this.order.items.splice(index, 1);
      }

      this.order.total = this.calculateTotal(this.order);
      this.order.itemCount = this.calculateItemCount(this.order);
    }
  }

  public addItemToCart(item: OrderItem) {
    const index = this.order.items.findIndex((cartItem) => cartItem === item);
    if (index !== -1) {
      this.order.items[index].quantity += 1;
    }

    this.order.total = this.calculateTotal(this.order);
    this.order.itemCount = this.calculateItemCount(this.order);
  }

  public removeAnItem(item: OrderItem) {
    const index = this.order.items.findIndex((cartItem) => cartItem === item);
    if (index !== -1) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        this.order.items.splice(index, 1);
      }

      this.order.total = this.calculateTotal(this.order);
      this.order.itemCount = this.calculateItemCount(this.order);
    }
  }

  liberarMesa(){
    this.mesas[this.numeroMesa - 1].status = true;
    this.mesas[this.numeroMesa - 1].order = { items: [], total: 0, itemCount: 0 };
    this.mesas[this.numeroMesa - 1].fecha = new Date();
  }

  /*saveMesa(): Promise<string> {
    const currentMesa = this.mesas.find((mesa) => mesa.numeroMesa === this.numeroMesa);
  
    if (currentMesa) {
      // Asegúrate de que numeroMesa sea un número antes de agregar la mesa
      const { numeroMesa, ...rest } = currentMesa;
      
      return this.mesaCollection.add({ numeroMesa, ...rest, fecha: new Date() })
        .then((doc) => {
          console.log("Mesa añadida con id " + doc.id);
          return "success";
        })
        .catch((error) => {
          console.log("Error al añadir la mesa " + error);
          return "error";
        });
    } else {
      console.error(`No se encontró la mesa con el número ${this.numeroMesa}`);
      return Promise.resolve("error");
    }
  }*/

  saveMesa(): Promise<string> {
    const currentMesa = this.mesas.find((mesa) => mesa.numeroMesa === this.numeroMesa);
  
    if (currentMesa) {
      const { numeroMesa, ...rest } = currentMesa;
      
      // Obtener la fecha y hora actuales
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString(); 
  
      return this.mesaCollection.add({ numeroMesa, ...rest, fecha: formattedDate })
        .then((doc) => {
          console.log("Mesa añadida con id " + doc.id);
          return "success";
        })
        .catch((error) => {
          console.log("Error al añadir la mesa " + error);
          return "error";
        });
    } else {
      console.error(`No se encontró la mesa con el número ${this.numeroMesa}`);
      return Promise.resolve("error");
    }
  }
  
  
  


  getNumeroMesa(): number {
    return this.numeroMesa;
  }

  getStatus(numeroMesa: number): boolean {
    return this.mesas[numeroMesa - 1].status;
  }

  setNumeroMesa(numeroMesa: number): void {
    this.numeroMesa = numeroMesa;
  }
}
