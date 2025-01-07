import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  hidePwdContent: boolean = true;
  constructor(fb: FormBuilder, private apiService: ApiService,private snackBar: MatSnackBar){
    this.loginForm = fb.group({
      email: fb.control('', [Validators.required]),
      password: fb.control('', [Validators.required]),
    })
  }

  login(){
    let loginInfo = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    }
    this.apiService.login(loginInfo).subscribe({
      next:(res) => {
        if(res == 'Not Found')
          this.snackBar.open('Credential are Invalid!', 'OK');
        else if(res == 'unapproved')
          this.snackBar.open('Your accound is not Approved by Admin!', 'OK');
        else if(res == 'blocked')
          this.snackBar.open('Your accound is BLOCKED. Please go to Admin office to Unblock.', 'OK');
        else{
          localStorage.setItem('access_token',res);
          this.apiService.userStatus.next('loggedIn');
        }
      }
    })
  }


}
