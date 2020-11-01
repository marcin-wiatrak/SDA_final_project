import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryComponent } from 'src/app/components/category/category.component';
import { Product } from 'src/app/models/product.model';
import { ProductsApiService } from 'src/app/services/products-api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Observable<string[]>;

  constructor(private productsApi: ProductsApiService,) { }

  ngOnInit(): void {
    this.categories = this.productsApi.getProducts().pipe(
      map((products: Product[]) => this.buildCategoriesFrom(products)),
    )
  }

  buildCategoriesFrom(products: Product[]): string[] {
    let categoryNames = {};
    for (let product of products) {
      if (product.category) {
        categoryNames[product.category] = 1;
      }
    }
    return Object.keys(categoryNames); 
  }
}
