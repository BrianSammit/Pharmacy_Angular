import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

   constructor(private service: ProductService){}

    @Input() searchingBy: string = '';
    s_founded: Product[] = [];
    founded: number = 0;
    selected: string = "name";
    page: number = 1;

     ngOnInit(): void {
        this.fetchData();
    }

    fetchData(){
      this.service.getAll().subscribe({
        next: (product) => {
          this.s_founded = product;
          this.founded = this.s_founded.length;
        },
        error: (console.log),
        complete: (console.log)
      })
    }

}
