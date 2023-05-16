import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import Swal from 'sweetalert2';
import { Paciente } from '../interfaces/paciente.interface';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: '../pages/paciente.component.html',
})
export class PacienteComponent {

  public imagenBanner!: string;
  //Breadcrumb
  breadcrumbItems: MenuItem[];

  //Inicialización de pacientes
  pacientes: Paciente[] = [];
  pacienteSeleccionado!: any;

  //Variables de modales
  displayCrearDialog = false; // provide an initializer here
  displayVerDialog = false;
  displayEditarDialog = false;

  //Variables de la tabla
  sortField: string | undefined;
  sortOrder: number | undefined;
  globalFilter: string;
  rowsOptions = [10, 50, 100];
  rows = 10;

  //Métodos de modales
  showModalCrearDialog() {
    //this.miFormulario.reset(); // resetear el formulario antes de abrir el modal
    this.displayCrearDialog = true;
  }

  //Método que muestra el modal para ver un paciente
  showModalVerDialog(paciente: Paciente) {
    this.pacienteSeleccionado = paciente;
    this.displayVerDialog = true;
  }

  // Método que se llama al hacer clic en el botón para abrir el diálogo de edición
  showModalEditarDialog(paciente: Paciente) {
    this.miFormulario.reset(); // resetear el formulario antes de abrir el modal
    this.pacienteSeleccionado = paciente;

    // Inicializar el formulario con los valores actuales del tratamiento seleccionado
    this.miFormulario.setValue({
      nombre: paciente.nombre,
      apellidos: paciente.apellidos,
      dni: paciente.dni,
      email: paciente.email,
      direccion: paciente.direccion,
      telefono_movil: paciente.telefono_movil,
      cp: paciente.cp,
      municipio: paciente.cp,
      provincia: paciente.provincia,
    });

    this.displayEditarDialog = true;
  }

  onHideCrearDialog() {
    this.displayCrearDialog = false;
  }
  onHideEditarDialog() {
    this.displayEditarDialog = false;
  }

  //Métodos de tabla
  applyGlobalFilter() {
    if (this.globalFilter === '') {
      this.resetGlobalFilter();
      this.obtenerPacientes()
    } else {
      this.pacientes = this.pacientes.filter((paciente: Paciente) => {
        return (
          paciente.nombre
            .toLowerCase()
            .includes(this.globalFilter.toLowerCase()) ||
          paciente.apellidos
            .toLowerCase()
            .includes(this.globalFilter.toLowerCase()) ||
          paciente.dni
            .toString()
            .toLowerCase()
            .includes(this.globalFilter.toLowerCase()) ||
          paciente.email
            .toLowerCase()
            .includes(this.globalFilter.toLowerCase()) ||
          paciente.direccion
            .toLowerCase()
            .includes(this.globalFilter.toLowerCase()) ||
          paciente.telefono_movil
            .toString()
            .toLowerCase()
            .includes(this.globalFilter.toLowerCase()) ||
          paciente.cp
            .toString()
            .toLowerCase()
            .includes(this.globalFilter.toLowerCase()) ||
          paciente.municipio
            .toLowerCase()
            .includes(this.globalFilter.toLowerCase()) ||
          paciente.provincia
            .toLowerCase()
            .includes(this.globalFilter.toLowerCase())
        );
      });
    }
  }

  resetGlobalFilter() {
    this.globalFilter = '';
    //this.tratamientos = []; // reset to empty array
    //this.getTratamiento();
  }

  removeCharacter() {
    if (this.globalFilter.length > 0) {
      this.globalFilter = this.globalFilter.substring(
        0,
        this.globalFilter.length - 1
      );
      this.applyGlobalFilter();
    }
  }

  onRowsChange(value: number) {
    this.rows = value;
  }

  ordenAscendente = true;

  actualizarIconoOrden(columna: string): string {
    if (this.sortField === columna) {
      if (this.sortOrder === 1) {
        return 'pi pi-sort-up';
      } else if (this.sortOrder === -1) {
        return 'pi pi-sort-down';
      } else {
        return 'pi pi-sort';
      }
    } else {
      return 'pi pi-sort';
    }
  }

  //Mi formulario
  miFormulario: FormGroup = this.fb.group({
    nombre: ['Rodrigo', [Validators.required]],
    apellidos: ['Martínez Díaz', [Validators.required]],
    dni: ['50505121-K', [Validators.required]],
    email: ['r@email.com', [Validators.required]],
    direccion: ['Avda. Gladiador 45, 2ºA', [Validators.required]],
    telefono_movil: ['6454637221', [Validators.required]],
    cp: ['28930', [Validators.required]],
    municipio: ['Móstoles', [Validators.required]],
    provincia: ['Madrid', [Validators.required]],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private pacienteService: PacienteService
  ) {
    //Inicialización del breadcrumb
    this.breadcrumbItems = [
      { label: ' Inicio', routerLink: '/dashboard', icon: 'pi pi-home' },
      { label: ' Paciente', icon: 'pi pi-users' },
    ];
    this.globalFilter = '';
  }

  // Call the service to get the inventory list
  ngOnInit(): void {
    this.obtenerPacientes();
    const random = Math.floor(Math.random() * 3);
  this.imagenBanner = `../../../assets/images/banner${random}.jpg`;
  }

  //Métodos del servicio de tratamiento
  crearPaciente() {
    const {
      nombre,
      apellidos,
      dni,
      email,
      direccion,
      telefono_movil,
      cp,
      municipio,
      provincia,
    } = this.miFormulario.value;

    this.pacienteService
      .crearPaciente(
        nombre,
        apellidos,
        dni,
        email,
        direccion,
        telefono_movil,
        cp,
        municipio,
        provincia
      )
      .subscribe(
        (resp) => {
          this.displayCrearDialog = false;
          Swal.fire('Éxito', 'Tratamiento creado correctamente', 'success');
          this.router.navigateByUrl('/dashboard/paciente');
          this.obtenerPacientes();
        },
        (error) => {
          this.displayCrearDialog = false;
          console.log(error);
          Swal.fire('Error', error.error.msg, 'error');
        }
      );
  }

  // Obtener los tratamientos y asignarlos a la variable this.tratamientos
  obtenerPacientes() {
    this.pacienteService.getPacientes().subscribe(
      (response) => {
        this.pacientes = response.pacientes;
        console.log(this.pacientes)
      },
      (error) => {
        console.log('Error al obtener pacientes', error);
      }
    );
  }

   //Borrar Paciente
   borrarPaciente(id: string) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: 'grey',
      confirmButtonColor: 'green',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacienteService.borrarPaciente(id).subscribe(
          () => {
            Swal.fire(
              'Eliminado',
              'Paciente eliminado correctamente',
              'success'
            );
            this.obtenerPacientes(); // refresh the doctor's list after deletion
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', error.error.msg, 'error');
          }
        );
      }
    });
}

getPacienteById(id: string) {
  this.pacienteService.getPacienteById(id).subscribe(
    (response) => {
      this.pacienteSeleccionado = response;
      console.log(response); // Aquí puede manipular la respuesta del servicio según sea necesario.
    },
    (error) => {
      console.log('Error al obtener paciente', error);
    }
  );
}

editarPaciente() {
  if (this.pacienteSeleccionado) {
    this.pacienteSeleccionado.nombre = this.miFormulario.get('nombre')?.value;
    this.pacienteSeleccionado.apellidos = this.miFormulario.get('apellidos')?.value;
    this.pacienteSeleccionado.email = this.miFormulario.get('email')?.value;
    this.pacienteSeleccionado.dni = this.miFormulario.get('dni')?.value;
    this.pacienteSeleccionado.telefono_movil = this.miFormulario.get('telefono_movil')?.value;
    this.pacienteSeleccionado.municipio = this.miFormulario.get('municipio')?.value;
    this.pacienteSeleccionado.provincia = this.miFormulario.get('provincia')?.value;
    this.pacienteSeleccionado.cp = this.miFormulario.get('cp')?.value;

    this.pacienteService.editarPaciente(this.pacienteSeleccionado).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Tratamiento editado correctamente'
        });
        this.displayEditarDialog = false;
      },
      error: (error) => {
        console.log('Error al editar el tratamiento:', error);
      }
    });
  }    
}

}
