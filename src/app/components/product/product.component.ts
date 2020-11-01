import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product: Product;

  @Output() onAddToCart: EventEmitter<Product> = new EventEmitter<Product>();

  startValue = "1";
  quantity: FormControl = new FormControl(this.startValue);

  onClick(product: Product): void {
    const productWithQuantity: Product = {
      ...product, quantity: Number.parseFloat(this.quantity.value),
    }
    this.onAddToCart.emit(productWithQuantity);
    this.quantity.patchValue(this.startValue);
  }
}
