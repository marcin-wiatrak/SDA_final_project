import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from "lodash";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart$: Observable<Product[]>;
  cartQuantity$: Observable<number>; 

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
    this.cartQuantity$ = this.cart$.pipe(
      map((products: Product[]) => {
        // return products.map((prod: Product) => prod.quantity)
        return _.sumBy(products, "quantity");
      })
      );
  }

  onRemoveFromCart(partialProduct: Partial<Product>) {
    this.cartService.deleteProductFromCart(partialProduct);
  }

}
