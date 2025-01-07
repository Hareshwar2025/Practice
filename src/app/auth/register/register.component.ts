import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hidePwdContent: boolean = true;
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private apiservice : ApiService, private snackBar: MatSnackBar) {
    
    this.registerForm = fb.group({
      firstName :fb.control('',[Validators.required]),
      lastName: fb.control('',[Validators.required]),
      email : fb.control('',[Validators.required]),
      mobile : fb.control('',[Validators.required]),
      password : fb.control('',[Validators.required]),
      rpassword : fb.control('',[Validators.required]),
    })
  }

  register(){
    let user = {
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      email : this.registerForm.get('email')?.value,
      mobile : this.registerForm.get('mobile')?.value,
      password : this.registerForm.get('password')?.value,
      rpassword : this.registerForm.get('rpassword')?.value,
    }
    this.apiservice.register(user).subscribe({
      next: res => {
        this.snackBar.open(res, "OK");
      }
    })
  }



}
