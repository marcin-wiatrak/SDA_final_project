import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsApiService } from '../../services/products-api.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { DISPLAY_MODES } from '../../models/display-modes';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  displayMode: DISPLAY_MODES = DISPLAY_MODES.card;
  displayModes = DISPLAY_MODES;

  constructor(
    private productsApi: ProductsApiService,
    private cartService: CartService,
    ) { }

  ngOnInit(): void {
    console.log('products initialized');
    this.products$ = this.productsApi.getProducts();
  }

  ngOnDestroy(): void {
    console.log('component destroyed');
  }

  onAddToCart(product: Product): void {
    this.cartService.addProductToCart(product);
  }

  onDisplayModeChange(mode: DISPLAY_MODES): void {
    console.log(mode);
    this.displayMode = mode;
  }
}
