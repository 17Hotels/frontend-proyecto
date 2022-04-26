export interface RespuestaReserva {
  id: number;
  idHabitacion: number;
  idUsuario: number;
  numeroHuespedes: number;
  fechaEntrada: Date;
  fechaSalida: Date;
  precioTotal: number;
  desayuno: boolean;
}
