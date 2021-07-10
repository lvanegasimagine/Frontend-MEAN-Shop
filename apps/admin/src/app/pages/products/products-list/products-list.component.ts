import { Component, OnInit } from '@angular/core';
import { ProductsService, Product } from '@frontend/products';


@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this._getProducts();
  }

  _getProducts() {
    this.productsService.getProducts().subscribe(resp => {
      this.products = resp;
      console.log(resp);
    })
  }
  deleteProduct(productId: string) {
    
  }

}
