import { RespuesHabitacion } from './respuesta-habitacion';
import { RespuestaHotel } from './respuesta-hotel';

export interface Reserva {
  id: number;
  habitacion: RespuesHabitacion;
  hotel: RespuestaHotel;
  idUsuario: number;
  numeroHuespedes: number;
  fechaEntrada: Date;
  fechaSalida: Date;
  precioTotal: number;
  desayuno: boolean;
}
