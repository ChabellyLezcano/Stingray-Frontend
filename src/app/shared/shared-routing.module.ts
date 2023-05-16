import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from '../guards/validar-token.guard';
import { DashboardComponent } from '../protected/components/dashboard.component';
import { DoctorComponent } from '../protected/components/doctor.component';
import { PacienteComponent } from '../protected/components/paciente.component';

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
export class SharedRoutingModule { }
