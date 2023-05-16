import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { Paciente, PacienteResponse } from '../interfaces/paciente.interface';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //Crear Paciente
  crearPaciente(
    nombre: string,
    apellidos: string,
    dni: string,
    email: string,
    direccion: string,
    telefono_movil: string,
    cp: string,
    municipio: string,
    provincia: string
  ) {
    const url = `${this.baseUrl}/paciente/crearPaciente`;
    const body = {
      nombre,
      apellidos,
      dni,
      email,
      direccion,
      telefono_movil,
      cp,
      municipio,
      provincia
    };
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.post<PacienteResponse>(url, body, { headers });
  }

  //Obtener pacientes
  getPacientes() {
    const url = `${this.baseUrl}/paciente/listarPacientes`;

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.get<PacienteResponse>(url, { headers });
  }
  //Borrar Paciente
  borrarPaciente(id: string) {
    const url = `${this.baseUrl}/paciente/borrarPaciente/${id}`;

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.delete<PacienteResponse>(url, { headers });
  }


  //Obtener paciente por ID
  getPacienteById(id: string) {
    const url = `${this.baseUrl}/paciente/verPaciente/${id}`;

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.get<PacienteResponse>(url, { headers });
  }


//Editar Paciente
editarPaciente(paciente: Paciente) {
  const url = `${this.baseUrl}/paciente/editarPaciente/${paciente._id}`;

  const headers = new HttpHeaders().set(
    'x-token',
    localStorage.getItem('token') || ''
  );

  return this.http.put<PacienteResponse>(url, paciente, { headers })
  
}
}
