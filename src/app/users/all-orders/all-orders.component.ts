import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from 'src/app/models/models';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent {

  columnsForPendingReturns: string[] = [
    'orderId',
    'userIdForOrder',
    'userNameForOrder',
    'bookId',
    'orderDate',
    'fineToPay',
  ];

  columnsForCompletedReturns: string[] = [
    'orderId',
    'userIdForOrder',
    'userNameForOrder',
    'bookId',
    'orderDate',
    'returnedDate',
    'finePaid',
  ];

  showProgressBar: boolean = false;
  ordersWithPendingReturns: Order[] = [];
  ordersWithCompletedReturns: Order[] = [];


  constructor(private apiService: ApiService, private snackBar: MatSnackBar){
    apiService.getOrders().subscribe({
      next: (res: Order[]) => {
        this.ordersWithPendingReturns = res.filter(o => !o.returned);
        this.ordersWithCompletedReturns = res.filter(o => o.returned);
      },
      error: (err) => {
        this.snackBar.open('No Orders Found', 'OK');
      }
    })
  }

  sendEmail(){
    this.showProgressBar = true;

    this.apiService.sendEmail().subscribe({
      next: (res) => {
        if(res === 'sent'){
          this.snackBar.open('Emails has been Sent to respected Students!', 'OK');
          this.showProgressBar = false;
        }else{
          this.snackBar.open('Emails has not been sent!', 'OK');
          this.showProgressBar = false;
        }
      },
    });
  }

  blockUsers(){
    this.showProgressBar =true;
    this.apiService.blockUsers().subscribe({
      next: (res) => {
        if(res === 'blocked'){
          this.snackBar.open('Eligible Users Accounts were BLOCKED!', 'OK');
          this.showProgressBar =false;
        }else {
          this.snackBar.open('Not BLOCKED!', 'OK');
          this.showProgressBar =false;
        }
      }
    })
  }
}
