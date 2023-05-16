import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './components/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';
import { MessageService } from 'primeng/api';
import { PacienteComponent } from './components/paciente.component';
import { DoctorComponent } from './components/doctor.component';


@NgModule({
  declarations: [
    DashboardComponent,
  PacienteComponent,
  DoctorComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ReactiveFormsModule,
    PrimeNgModule,
    SharedModule,
    FormsModule
  ],
  providers: [MessageService]
})
export class ProtectedModule { }
