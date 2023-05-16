import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from '../guards/validar-token.guard';
import { DashboardComponent } from './components/dashboard.component';
import { DoctorComponent } from './components/doctor.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [ValidarTokenGuard],
  },
  {
    path: 'doctor',
    component: DoctorComponent,
    canActivate: [ValidarTokenGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
