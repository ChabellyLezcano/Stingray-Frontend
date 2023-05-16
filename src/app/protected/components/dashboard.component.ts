import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: '../pages/dashboard.component.html'
})
export class DashboardComponent {

  get usuario() {
    return this.authService.usuario;
  }

  constructor(private router: Router, private authService: AuthService) {
   
  }

  logout() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }

}
