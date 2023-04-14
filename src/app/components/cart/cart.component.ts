import { Component, Input } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Cart } from 'src/app/models/cart.model';

import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {


   constructor(private service: CartService){}

    @Input() searchingBy: string = '';
    s_founded: Product[] = [];
    cart: Cart | undefined;
    founded: number = 0;
    selected: string = "name";
    page: number = 1;
    totaPrice: number = 0;

     ngOnInit(): void {
        this.fetchData();
    }

    fetchData(){
      this.service.getCartById("db9784c6-4").subscribe({
        next: (cart) => {
          this.totaPrice = cart.totalPrice
          this.s_founded = cart.products;
          this.founded = this.s_founded.length;
        },
        error: (console.log),
        complete: (console.log)
      })
    }

}
