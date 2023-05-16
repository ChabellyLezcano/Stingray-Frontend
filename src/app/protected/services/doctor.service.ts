import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { DoctorResponse } from '../interfaces/doctor.interface';


@Injectable({
  providedIn: 'root',
})
export class DoctorService {
    private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //Crear Doctor
  crearDoctor(
    foto:           string,
    cabecera:       string,
    nombre:         string,
    apellidos:      string,
    email:          string,
    numColegiado:   string,
    telefono_movil: string,
    especialidad:   string,
    dni:            string,
  ) {
    const url = `${this.baseUrl}/doctor/crearDoctor`;
    const body = {
        foto,
        cabecera,
        nombre,
        apellidos,
        email,
        numColegiado,
        telefono_movil,
        especialidad,
        dni
    };
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.post<DoctorResponse>(url, body, { headers });
  }



  //Obtener doctores
  getDoctores() {
    const url = `${this.baseUrl}/doctor/listarDoctores`;

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.get<DoctorResponse>(url, { headers });
  }
}