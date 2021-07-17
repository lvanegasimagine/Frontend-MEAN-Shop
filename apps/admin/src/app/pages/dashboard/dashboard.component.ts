import { Component, OnInit,OnDestroy } from '@angular/core';
import { OrdersService } from '@frontend/orders';
import { ProductsService } from '@frontend/products';
import { UsersService } from '@frontend/users';
import { combineLatest } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  endsubs$: Subject<any> = new Subject();

  statistics: any = [];
  constructor(private userService: UsersService, private productService: ProductsService, private ordersService: OrdersService){
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.ordersService.getTotalSales()
    ]).pipe(takeUntil(this.endsubs$)).subscribe((values) => {
      this.statistics = values;
    });
  }
}
