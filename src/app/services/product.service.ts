import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  api: string = "http://localhost:8080/products"

  getAll(): Observable<any> {
      return this.http.get(this.api);
  }
}
