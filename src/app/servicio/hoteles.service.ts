import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, lastValueFrom } from 'rxjs';
import { NuevaReserva } from '../modelo/nueva-reserva';
import { NuevaValoracion } from '../modelo/nueva-valoracion';
import { RespuestaFoto } from '../modelo/respuesta-foto';
import { RespuesHabitacion } from '../modelo/respuesta-habitacion';
import { RespuestaHotel } from '../modelo/respuesta-hotel';
import { RespuestaReserva } from '../modelo/respuesta-reserva';
import { RespuestaUsuario } from '../modelo/respuesta-usuario';
import { RespuestaValoracion } from '../modelo/respuesta-valoracion';
import { UsuarioLogin } from '../modelo/usuario-login';
import { UsuarioRegistro } from '../modelo/usuario-registro';

@Injectable({
  providedIn: 'root',
})
export class HotelesService {
  public isUserLoggedIn: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  async getHoteles() {
    return lastValueFrom(
      this.http.get<RespuestaHotel[]>('http://localhost:9090/hoteles')
    );
  }

  async getHotel(id: number) {
    return lastValueFrom(
      this.http.get<RespuestaHotel>(`http://localhost:9090/hoteles/${id}`)
    );
  }

  async getDestinos() {
    return lastValueFrom(
      this.http.get<string[]>('http://localhost:9090/hoteles/destinos')
    );
  }

  async getHotelesPorCiudad(ciudad: string) {
    return lastValueFrom(
      this.http.get<RespuestaHotel[]>(
        `http://localhost:9090/hoteles/ciudad/${ciudad}`
      )
    );
  }

  async getFotosHotel(id: number) {
    return lastValueFrom(
      this.http.get<RespuestaFoto[]>(
        `http://localhost:9090/hoteles/${id}/fotos`
      )
    );
  }

  async getHabitacionesHotel(idHotel: number) {
    return lastValueFrom(
      this.http.get<RespuesHabitacion[]>(
        `http://localhost:9090/hoteles/${idHotel}/habitaciones`
      )
    );
  }

  async getHabitacion(idHabitacion: number) {
    return lastValueFrom(
      this.http.get<RespuesHabitacion>(
        `http://localhost:9090/habitaciones/${idHabitacion}`
      )
    );
  }

  async nuevaReserva(reserva: NuevaReserva) {
    return lastValueFrom(
      this.http.post<RespuestaReserva>(
        `http://localhost:9090/reservas`,
        reserva
      )
    );
  }

  async login(usuario: UsuarioLogin) {
    return lastValueFrom(
      this.http.post<RespuestaUsuario>(`http://localhost:9090/usuarios/login`, {
        email: usuario.email,
        password: usuario.password,
      })
    );
  }

  async registro(usuario: UsuarioRegistro) {
    return lastValueFrom(
      this.http.post<RespuestaUsuario>(
        `http://localhost:9090/usuarios/registro`,
        usuario
      )
    );
  }

  async getReservasUsuario(idUsuario: number) {
    return lastValueFrom(
      this.http.get<RespuestaReserva[]>(
        `http://localhost:9090/usuarios/${idUsuario}/reservas`
      )
    );
  }

  async getValoracionesHotel(idHotel: number) {
    return lastValueFrom(
      this.http.get<RespuestaValoracion[]>(
        `http://localhost:9090/hoteles/${idHotel}/valoraciones`
      )
    );
  }

  async valorarHotel(valoracion: NuevaValoracion) {
    return lastValueFrom(
      this.http.post<RespuestaValoracion>(
        `http://localhost:9090/hoteles/${valoracion.idHotel}/valorar`,
        valoracion
      )
    );
  }

  async getUsuario(id: number) {
    return lastValueFrom(
      this.http.get<RespuestaUsuario>(`http://localhost:9090/usuarios/${id}`)
    );
  }
}
