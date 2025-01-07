import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountStatus, Order, User, UserType } from 'src/app/models/models';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-page-table',
  templateUrl: './page-table.component.html',
  styleUrls: ['./page-table.component.css']
})
export class PageTableComponent {

  @Input() 
  columns: string[] = ['userId'];

  @Input()
  dataSource: any[] = [
  ];

  @Output()
  approve = new EventEmitter<User>();

  @Output()
  unblock = new EventEmitter<User>();


  getFineToPay(order : Order){
    return this.apiService.getFine(order);
  }

  constructor(private apiService: ApiService){

  }

  getAccountStatus(input: AccountStatus){
    return AccountStatus[input];
  }
}
