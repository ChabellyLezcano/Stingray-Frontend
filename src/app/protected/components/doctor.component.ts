import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import Swal from 'sweetalert2';
import { Doctor } from '../interfaces/doctor.interface';
import { DoctorService } from '../services/doctor.service';
import { PacienteComponent } from './paciente.component';

@Component({
  selector: 'app-doctor',
  templateUrl: '../pages/doctor.component.html'
})
export class DoctorComponent {

   //Breadcrumb
   breadcrumbItems: MenuItem[];

   cabeceraOptions: any[] = [
    { label: '', value: '' },
    { label: 'Dr.', value: 'Dr.' },
    { label: 'Dra.', value: 'Dra.' }
  ];
  

   //Inicialización de pacientes
  doctores: Doctor[] = [];
  doctorSeleccionado!: any;

  //Variables de modales
  displayCrearDialog = false; // provide an initializer here
  displayVerDialog = false;
  displayEditarDialog = false;

   //Métodos de modales
   showModalCrearDialog() {
    //this.miFormulario.reset(); // resetear el formulario antes de abrir el modal
    this.displayCrearDialog = true;
  }

  //Método que muestra el modal para ver un doctor
  showModalVerDialog(doctor: Doctor) {
    this.doctorSeleccionado = doctor;
    this.displayVerDialog = true;
  }

  // Método que se llama al hacer clic en el botón para abrir el diálogo de edición
  showModalEditarDialog(doctor: Doctor) {
    this.miFormulario.reset(); // resetear el formulario antes de abrir el modal
    this.doctorSeleccionado = doctor;

    // Inicializar el formulario con los valores actuales del tratamiento seleccionado
    this.miFormulario.setValue({
      foto: doctor.foto,
        cabecera: doctor.cabecera,
        nombre: doctor.nombre,
        apellidos: doctor.apellidos,
        email: doctor.email,
        numColegiado: doctor.numColegiado,
        telefono_movil: doctor.telefono_movil,
        especialidad: doctor.especialidad,
        dni: doctor.dni
    });

    this.displayEditarDialog = true;
  }

  onHideCrearDialog() {
    this.displayCrearDialog = false;
  }
  onHideEditarDialog() {
    this.displayEditarDialog = false;
  }

  //Mi formulario
  miFormulario: FormGroup = this.fb.group({
    foto: [''],
    cabecera: ['Dr.', [Validators.required]],
    nombre: ['Rodrigo', [Validators.required]],
    apellidos: ['Martínez Díaz', [Validators.required]],
    email: ['r@email.com', [Validators.required]],
    numColegiado: ['289393931', [Validators.required]],
    telefono_movil: ['6454637221', [Validators.required]],
    especialidad: ['Ortodoncia', [Validators.required]],
    dni: ['50505121-K', [Validators.required]],
  });

   constructor(
    private router: Router,
    private fb: FormBuilder,
    private doctorService: DoctorService
  ) {
    //Inicialización del breadcrumb
    this.breadcrumbItems = [
      { label: ' Inicio', routerLink: '/dashboard', icon: 'pi pi-home' },
      { label: ' Doctor', icon: 'pi pi-briefcase' },
    ];

    
  
  }


    // Call the service to get the inventory list
    ngOnInit(): void {
      //this.obtenerPacientes();
     
    }

    //Métodos del servicio de tratamiento
  crearDoctor() {
    const {
      foto,
      cabecera,
      nombre,
      apellidos,
      email,
      numColegiado,
      telefono_movil,
      especialidad,
      dni
    } = this.miFormulario.value;
console.log(this.miFormulario.value)
    this.doctorService
      .crearDoctor(
        foto,
        cabecera,
        nombre,
        apellidos,
        email,
        numColegiado,
        telefono_movil,
        especialidad,
        dni
      )
      .subscribe(
        (resp) => {
          this.displayCrearDialog = false;
          Swal.fire('Éxito', 'Doctor creado correctamente', 'success');
          this.router.navigateByUrl('/dashboard/doctor');
          //this.obtenerPacientes();
        },
        (error) => {
          this.displayCrearDialog = false;
          console.log(error);
          Swal.fire('Error', error.error.msg, 'error');
        }
      );
  }

}
