import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/service/auth.service';


@Component({
  selector: 'app-headbar',
  templateUrl: './headbar.component.html'
})
export class HeadbarComponent {
    menuItems: MenuItem[];

  constructor(private router: Router, private authService: AuthService) {
    this.menuItems = [
      {
        label: 'Apariencia',
        icon: 'pi pi-palette',
        routerLink: '/apariencia'
      },
      {
        label: 'General',
        icon: 'pi pi-cog',
        routerLink: '/general'
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
        iconStyle: 'color: red;',
        styleClass: 'logout-icon'
      }
    ];
    
   
  }    
  logout() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }


  get usuario() {
    return this.authService.usuario;
  }

}
