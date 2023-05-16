export interface PacienteResponse{
    paciente: Paciente;
    msg?:      string;
    ok:       boolean;
    pacientes: Paciente[];
}

export interface Paciente {
    nombre:         string;
    apellidos:      string;
    dni:            string;
    email:          string;
    direccion:      string;
    telefono_movil: string;
    cp:             string;
    municipio:      string;
    provincia:      string;
    usuario:        string;
    _id:            string;
    __v:            number;
}