import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent implements OnInit, OnChanges {

  @Input() product: Product;

  @Output() removeFromCart: EventEmitter<Partial<Product>> = new EventEmitter<Partial<Product>>();

  quantity: FormControl;

  constructor() { }

  ngOnInit(): void {
  this.quantity = new FormControl(this.product.quantity);
  }

  onRemoveFromCart(id: number) {
    const partialProduct: Partial<Product> = {id, quantity: Number.parseFloat(this.quantity.value)};
    this.removeFromCart.emit(partialProduct);
  }

  ngOnChanges(change: SimpleChanges): void {
    if (this.quantity) {
      this.quantity.patchValue(this.product.quantity);
    }
    console.log(this.product);
  }

}
