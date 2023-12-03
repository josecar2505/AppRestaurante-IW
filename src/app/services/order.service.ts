import { Injectable } from '@angular/core';
import { 	Product } from '../models/product.model';
import {Order, OrderItem} from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class ComServiceService {
  private order: Order = {
    items: [],
    total: 0,
    itemCount: 0
  };

  constructor() { }

  public getOrder(): Order {
    return this.order;
  }

  


  public addToOrder(product: Product): Order {

    const existingOrderItem = this.order.items.find((item) => item.product.name === product.name);

    if (existingOrderItem) {
      // El producto ya existe en el carrito, actualiza la cantidad
      existingOrderItem.quantity += 1;
    } else {
      // El producto no existe en el carrito, agrégalo como un nuevo elemento
      const newItem: OrderItem = {
        product: product,
        quantity: 1,
      };
      this.order.items.push(newItem);
    }

    // Actualiza el total y la cantidad de artículos
    this.order.total = this.calculateTotal(this.order);
    this.order.itemCount = this.calculateItemCount(this.order);

    return this.order;
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
        // Si la cantidad a eliminar es igual o mayor que la cantidad en el carrito, elimina el elemento por completo.
        this.order.items.splice(index, 1);
      }
  
      // Actualiza el total y la cantidad de artículos
      this.order.total = this.calculateTotal(this.order);
      this.order.itemCount = this.calculateItemCount(this.order);
    }
  }

  public addItemToCart(item: OrderItem) {
    const index = this.order.items.findIndex((cartItem) => cartItem === item);
    if (index !== -1) {
      this.order.items[index].quantity += 1;
    }

    // Actualiza el total y la cantidad de artículos
    this.order.total = this.calculateTotal(this.order);
    this.order.itemCount = this.calculateItemCount(this.order);
  }

  public removeAnItem(item: OrderItem) {
    const index = this.order.items.findIndex((cartItem) => cartItem === item);
    if (index !== -1) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // Si la cantidad a eliminar es igual o mayor que la cantidad en el carrito, elimina el elemento por completo.
        this.order.items.splice(index, 1);
      }

      // Actualiza el total y la cantidad de artículos
      this.order.total = this.calculateTotal(this.order);
      this.order.itemCount = this.calculateItemCount(this.order);
    }
  }

}
