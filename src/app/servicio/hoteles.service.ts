import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { RespuestaFoto } from '../modelo/respuesta-foto';
import { RespuesHabitacion } from '../modelo/respuesta-habitacion';
import { RespuestaHotel } from '../modelo/respuesta-hotel';

@Injectable({
  providedIn: 'root',
})
export class HotelesService {
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
}
