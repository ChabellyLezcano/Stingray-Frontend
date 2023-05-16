export interface DoctorResponse {
    ok:     boolean;
    msg:    string;
    doctor: Doctor;
    doctores: Doctor[];
}

export interface Doctor {
    foto:           string;
    cabecera:       string;
    nombre:         string;
    apellidos:      string;
    email:          string;
    numColegiado:   string;
    telefono_movil: string;
    especialidad:   string;
    dni:            string;
    usuario:        string;
    _id:            string;
    __v:            number;
}