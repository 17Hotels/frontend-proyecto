import { RespuestaHotel } from './respuesta-hotel';
import { RespuestaUsuario } from './respuesta-usuario';

export interface Valoracion {
  id: number;
  usuario: RespuestaUsuario;
  hotel: RespuestaHotel;
  comentario: string;
  fecha: Date;
  nota: number;
}
