import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import { combineLatest, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsApiService } from 'src/app/services/products-api.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  filteredProducts$: Observable<Product[]>;

  constructor(
    private searchService: SearchService,
    private productApiService: ProductsApiService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.filteredProducts$ = combineLatest([
      this.searchService.searchPhrase$,
      this.productApiService.getProducts(),
    ]).pipe(
      map(([value, products]) => {
        return products.filter((product: Product) => product.description.toLowerCase().includes(value.toLowerCase()) || product.title.toLowerCase().includes(value.toLowerCase()));
      }))

  }

  onAddToCart(product: Product) {
    this.cartService.addProductToCart(product);
  }

}
