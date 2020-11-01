import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  cart$: Observable<Product[]> = this.cart.asObservable();

  addProductToCart(product: Product): void {
    this.cart$.pipe(take(1))
      .subscribe((products: Product[]) => {
        const productAlredyInCart = products.find((prod: Product) => prod.id === product.id);
        if(productAlredyInCart) {
          const filteredProducts: Product[] = products.filter((prod: Product) => prod.id !== productAlredyInCart.id);
          const updatedProduct: Product = {...productAlredyInCart, quantity: productAlredyInCart.quantity + product.quantity };
          this.cart.next([...filteredProducts, updatedProduct]);
        } else {
          this.cart.next([...products, product]);
        }
      });
  }

  deleteProductFromCart(partialProduct: Partial<Product>): void {
    this.cart$.pipe(take(1))
      .subscribe((products: Product[]) => {
        const productFromCart = products.find((product: Product) => product.id === partialProduct.id);
        const filteredProducts = products.filter((product: Product) => product.id !== partialProduct.id);
        if (partialProduct.quantity === productFromCart.quantity) {
          this.cart.next(filteredProducts);
        } else {
          const upadatedProduct = {...productFromCart, quantity: productFromCart.quantity- partialProduct.quantity};
          this.cart.next([...filteredProducts, upadatedProduct]);

        }
        
      })
  }
}
