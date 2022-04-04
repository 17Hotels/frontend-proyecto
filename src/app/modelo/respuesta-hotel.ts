export interface RespuestaHotel {
  id: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  pais: string;
  codigoPostal: string;
  email: string;
  telefono: string;
  web: string;
  estrellas: number;
  descripcion: string;
  wifi: boolean;
  aireAcondicionado: boolean;
  parking: boolean;
  mascotas: boolean;
  gimnasio: boolean;
  calefaccion: boolean;
  accesibilidad: boolean;
  horaEntrada: string;
  horaSalida: string;
  precioParking: number;
}
