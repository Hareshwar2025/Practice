import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from 'src/app/models/models';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent {

  columnsForPendingReturns: string[] = [
    'orderId',
    'bookId',
    'bookTitle',
    'orderDate',
    'fineToPay',
  ];
  columnsForCompletedReturns: string[] = [
    'orderId',
    'bookId',
    'bookTitle',
    'orderDate',
    'returnDate',
    'finePaid',
  ];
  pendingReturns: Order[] = [];
  completedReturns: Order[] = [];

  constructor(private apiService: ApiService, private snackBar: MatSnackBar){
    let userId = this.apiService.getUserInfo()!.id;
    apiService.getOrdersOfUser(userId).subscribe({
      next: (res: Order[]) => {
        console.log(res);
        this.pendingReturns = res.filter((o) => !o.returned);
        this.completedReturns = res.filter((o) => o.returned)
      },
    });
  }

  getFineToPay(order: Order) {
    return this.apiService.getFine(order);
  }
  
}
