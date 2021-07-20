import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model';
@Component({
  selector: 'frontend-product-item',
  templateUrl: './product-item.component.html',
  styles: [
  ]
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product = {};


  constructor() { }

  ngOnInit(): void {
  }

}
