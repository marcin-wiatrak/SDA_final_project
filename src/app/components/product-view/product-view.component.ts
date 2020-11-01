import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { ProductsApiService } from 'src/app/services/products-api.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription;

  product: Product;

  constructor(private route: ActivatedRoute, private apiService: ProductsApiService) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const id = Number.parseFloat(params.get('id'));
          return this.apiService.getProduct(id);
        }))
      .subscribe((product: Product) => {
        this.product = product;
        console.log(product);
      });

    //this.route
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
