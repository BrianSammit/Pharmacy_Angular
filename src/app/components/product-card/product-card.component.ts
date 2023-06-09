import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  isAuth: boolean;
  cartId: string | undefined = this.variablesService.user?.cart?.id;

 constructor(
   private service: CartService,
   private variablesService: SharedVariablesService,
   private toastr: ToastrService,
 ) {
   this.isAuth = this.variablesService.isAuth;
   variablesService.isAuthChanged.subscribe((newValue: boolean) => {
     this.isAuth = newValue;
   });
 }


   @Input() product: Product = {
    id: '',
    name: '',
    description: '',
    price: 0,
    img: '',
    category: '',
   }

   addProductToCart(product: Product) {
     return this.service.addProductToCart(this.cartId, this.product.id)
     .subscribe((r) => {
      this.toastr.success(
        'Product was remove from cart successfully'
      );
     },
     (error) => {
       console.log(error)
       alert("An error occurred while adding the item to the cart: "+ error.error)
     })
   }


}
