import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './containers/products/products.component';
import { CartComponent } from './containers/cart/cart.component';
import { FormComponent } from './components/form/form.component';
import { SearchResultComponent } from './containers/search-result/search-result.component';
import { ProductViewComponent } from './components/product-view/product-view.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'products/:id',
    component: ProductViewComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'register-form',
    component: FormComponent,
  },
  {
    path: 'search-result',
    component: SearchResultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
