export interface RespuesHabitacion {
  id: number;
  nombre: string;
  idHotel: number;
  precioNoche: number;
  precioDesayuno: number | null;
  capacidad: number;
}
