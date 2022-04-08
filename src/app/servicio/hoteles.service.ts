import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { RespuestaFoto } from '../modelo/respuesta-foto';
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
}
