import { Component, OnInit } from '@angular/core';
import { ProductsApiService } from './services/products-api.service';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'final-project-sda-front';

  constructor(private productsApi: ProductsApiService) {
  }

  ngOnInit(): void {
    this.productsApi.getProducts()
      .subscribe((res: Product[]) => {
        console.log(res);
      });

    this.productsApi.getProduct(15)
      .subscribe((res: Product) => {
        console.log(res);
      });
  }
}
