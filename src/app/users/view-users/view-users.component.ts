import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/models';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent {
  columns: string[] = [
    'userId',
    'userName',
    'email',
    'mobileNumber',
    'createdOn',
    'accountStatus',
    'unblock',
    'userType',
  ];
  users: User[] = [];

  constructor(private apiService : ApiService,private snackBar: MatSnackBar){
    apiService.getUsers().subscribe({
      next: (res : User[]) => {
        this.users = [];
        res.forEach((r) => this.users.push(r));
      }
    })
  }

  unblockUser(user: User) {
    var id = user.id;
    this.apiService.unblock(id).subscribe({
      next: (res) => {
        if (res === 'unblocked') {
          this.snackBar.open('User has been UNBLOCKED!', 'OK');
        } else this.snackBar.open('Not Unblocked', 'OK');
      },
    });
  }

}
