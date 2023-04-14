import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

 constructor(
   private router: Router,
   private service: ProductService,
 ) { }

   @Input() product: Product = {
    id: '',
    name: '',
    description: '',
    price: 0,
    img: '',
    category: '',
  }

 // addToCart(product: Product) {
   // return this.shopingCart.addToCart(product);
 // }

}
