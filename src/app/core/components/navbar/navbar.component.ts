import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
//import { LayoutService } from '../../services/layout.service';
import { LayoutService } from 'src/app/core/services/layout.service';
import { User } from 'src/app/shared/models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'al-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  homePath: string = 'home';
  loginPath: string = 'login';
  registerPath: string = 'register';

  user: User | null;
  private subscription: Subscription;

  constructor(
    private router: Router,
    private layoutService: LayoutService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.subscription =
    this.authService.user$.subscribe(user => this.user = user);
  }

  public isActive(page: string): boolean {
    return this.router.isActive(page, true);
  }

  public navigate(page: string): void {
    this.router.navigate([page]);
  }

  public toggleSidenav() {
    this.layoutService.toggleSidenav();
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
