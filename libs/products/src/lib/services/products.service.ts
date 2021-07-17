import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Product } from '../models/product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiURLProducts = environment.apiURL + 'products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURLProducts);
  }

  getProductsById(ProductId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiURLProducts}/${ProductId}`);
  }

  createProduct(Product: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.apiURLProducts}/`, Product);
  }

  updateProduct(Product: FormData, productId: string): Observable<Product> {
    return this.http.put<Product>(`${this.apiURLProducts}/${productId}`, Product);
  }

  deleteProduct(ProductId: string): Observable<Object> {
    return this.http.delete<Object>(`${this.apiURLProducts}/${ProductId}`, );
  }

  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLProducts}/get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }

}
