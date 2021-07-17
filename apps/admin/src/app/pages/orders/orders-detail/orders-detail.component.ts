import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@frontend/orders';
import { MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html'
})
export class OrdersDetailComponent implements OnInit {

  public order: any;
  orderStatuses: any = [];
  selectedStatus: any;

  constructor(
    private orderService: OrdersService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  private _mapOrderStatus() { // Alternativa a este error
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: +key,
        name: ORDER_STATUS[2].label
      };
    });
    console.log(this.orderStatuses);
  }

  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.orderService.getOrder(params.id).subscribe((order) => {
          this.order = order;
          console.log(this.order);
          this.selectedStatus = order.status;
        });
      }
    });
  }

  onStatusChange(event: any) {
   this.orderService.updateOrder({ status: event.value }, this.order.id).subscribe(
     () => {
       this.messageService.add({
         severity: 'success',
         summary: 'Success',
         detail: 'Order is updated!'
       });
     },
     () => {
       this.messageService.add({
         severity: 'error',
         summary: 'Error',
         detail: 'Order is not updated!'
       });
     }
   );
  }

}
