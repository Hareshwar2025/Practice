import { Component, OnInit } from '@angular/core';
import { ApiService } from './shared/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    let status = this.apiService.isLoggedIn() ? 'loggedIn' : "loggedoff";
    this.apiService.userStatus.next(status);
  }
  title = 'UI';
  constructor(private apiService: ApiService){

  }
}
