import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  value: string = '';
  showPassword = false;
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  miFormulario: FormGroup = this.fb.group({
    email: [localStorage.getItem('email') || 'gon@gmail.com', [Validators.required, Validators.email]],
    password: ['Hola123456', [Validators.required, Validators.minLength(8)]],
    rememberMe: [false]
  });

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  login() {
    const {email, password} = this.miFormulario.value
    if(this.miFormulario.get('rememberMe')?.value){
      localStorage.setItem('email', this.miFormulario.get('email')?.value)
    }
    else {
      localStorage.removeItem('email');
    }
    this.authService.login(email, password)
    .subscribe( ok => {
      if(ok === true){
      this.router.navigateByUrl('/dashboard');
      console.log('Login')
      }
      else {
        Swal.fire('Error', ok, 'error');
      }
    })

    
  }

  rememberMe() {}
}
