import { Component, OnInit } from '@angular/core';
import { UsersService } from './core/services/users.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'al-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.tryAutoLogin();
  }

  private tryAutoLogin() {
    // TOKEN exists ?
    const token = localStorage.getItem('token');
    if(!token) { return; }

    // TOKEN still valid ?
    const expirationDate = +localStorage.getItem('expirationDate')!;
    const now = new Date().getTime();
    if(now >= expirationDate) {
      return;
    }

    // Connect User
    const userId: string = localStorage.getItem('userId')!;
    this.usersService.get(userId).subscribe(user => {
      if(!user) {
        return;
      }
      this.authService.autoLogin(user);
    })

  }

}
