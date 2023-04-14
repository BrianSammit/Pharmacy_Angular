import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) { }

  api: string = "http://localhost:8080/carts"

  getCartById(cartId: String|undefined): Observable<any>{
    return this.http.get(`${this.api}/${cartId}`);
  }

  saveCart({}): Observable<any>{
    return this.http.post(this.api, {});
  }

  addProductToCart(cartId: string| undefined, productId: string| undefined): Observable<any>{
    return this.http.post(`${this.api}/db9784c6-4/addProduct/${productId}`, null)
  }

  removeProductFromCart(cartId: string| undefined, productId: string| undefined): Observable<any>{
    return this.http.post(`${this.api}/db9784c6-4/removeProduct/${productId}`, null)
  }

  deleteCart(cartId: string): Observable<any>{
    return this.http.delete(`${this.api}/${cartId}`);
  }

}
