import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { OrdersModule } from '@frontend/orders';

@NgModule({
  imports: [CommonModule, OrdersModule, RouterModule, ButtonModule],
  declarations: [
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductItemComponent,
    ProductsSearchComponent
  ],
  exports: [
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductItemComponent,
    ProductsSearchComponent
  ]
})
export class ProductsModule {}
