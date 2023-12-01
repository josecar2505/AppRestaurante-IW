import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { from } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private products: Observable<Product[]>;
    private productCollection: AngularFirestoreCollection<Product>;
    private productact: Product = {
      id: "",
      name: "",
      description: "",
      price: 0,
      photo: "",
      type: "",
    };

    constructor(private firestore: AngularFirestore) {
        this.productCollection = this.firestore.collection<Product>('products');
        this.products = this.productCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data() as Product;
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
          );
        
    }

    
    saveProduct(product: Product): Promise<string> {
      return this.productCollection.add(product).then((doc) => {
        console.log("Producto añadido con id" + doc.id); return "success";
      }).catch((error) => {
        console.log("Error al anadir el producto" + error); return "error";
      });
    }

    public updateProduct(product: Product): Promise<void> {
      return this.productCollection.doc(this.productact.id).update(product);
    }

    public deleteProduct(product: Product): Promise<void> {
      return this.productCollection.doc(product.id).delete();
    }

    public setProductAct(product: Product): void {
      this.productact = product;
    }
    
    public getProductAct(): Product {
      return this.productact;
    }
    getProducts(): Observable<Product[]> {
     return this.products;
    }
}