import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountStatus, User } from 'src/app/models/models';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-approval-requests',
  templateUrl: './approval-requests.component.html',
  styleUrls: ['./approval-requests.component.css']
})
export class ApprovalRequestsComponent {
  columns: string[] = ['userId','userName','email','userType','createdOn' ,'approve'];

  users: User[] = [
    ];

    constructor(private apiService: ApiService, private snackBar : MatSnackBar){

      apiService.getUsers().subscribe({
        next: (res: User[]) => {
          console.log(res);
          this.users = res.filter((r) => r.accountStatus == AccountStatus.UNAPROOVED);
        },
      });
    }


    approve(user: User){
      this.apiService.approveRequest(user.id).subscribe({
        next: (res) => {
          if(res === 'approved'){
            this.snackBar.open(`Approved for ${user.id}`,'OK');
          }else this.snackBar.open(`Not Approved`, 'OK');
        }
      })
    }
}
