import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Cart } from 'src/app/models/cart.model';

import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
   isAuth: boolean;

  p: number = 0;
  cart: Cart | undefined;
  products: Product[] | undefined = [];
  itemId: string | undefined;
  total: number | undefined = this.products?.length;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private variablesService: SharedVariablesService,
    private cartService: CartService
  ) {
    this.isAuth = this.variablesService.isAuth;
    variablesService.isAuthChanged.subscribe((newValue: boolean) => {
      this.isAuth = newValue;
    });
}

  ngOnInit(): void {
    //console.log(this.route.snapshot.url.join('/'));
    this.route.queryParams.subscribe((info)=>{
      if(JSON.stringify(info) !== JSON.stringify({})){
        this.itemId = JSON.parse(info['data']);
        this.removeItem(this.itemId);
      }

    })

    if (this.isAuth) {
      this.cartService.getCartById(this.variablesService.user?.cart?.id).subscribe(
        (answer) => {
          //console.log(answer);
          this.cart = answer;
          this.products = this.cart?.products;
          //console.log(this.products);
          this.total = this.products?.length;
        },
        (Error) => {
          console.error('error caught in component' + Error);
        })
    }

  }

  removeItem(itemId: string | undefined) {
    if (this.isAuth && confirm(`Are you sure of remove that product from your shopping cart?`)) {
      this.cartService.removeItemFromList(this.variablesService.user?.cart?.id, itemId)
      .subscribe(
        (answer) => {
          //console.log(answer);
          this.router.navigate(['/carts']);
          //location.replace('carts/removeItem');
        },
        (error) => {
          console.log(error);
        }
      )
    } else {
      this.router.navigate(['/users/login']);
    }
  }

  goToReceipt(){
    this.router.navigate(['/receipts/create']);
  }

}
