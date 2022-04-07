import { Component, OnInit } from '@angular/core';
import { Destino } from 'src/app/modelo/destino';
import { RespuestaHotel } from 'src/app/modelo/respuesta-hotel';
import { HotelesService } from 'src/app/servicio/hoteles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  hoteles!: RespuestaHotel[];
  destinos!: string[];
  destino: Destino = {
    destino: '',
    check_in: undefined,
    check_out: undefined,
  };

  constructor(private servicio: HotelesService) {}

  async ngOnInit() {
    this.hoteles = await this.servicio.getHoteles();
    this.destinos = await this.servicio.getDestinos();
    console.log(this.hoteles);
    console.log(this.destinos);
  }

  async consultarHoteles(formulario: Destino) {
    let ciudad: string = this.getCiudadDeDestino(formulario.destino);
    this.hoteles = await this.servicio.getHotelesPorCiudad(ciudad);
    console.log(formulario);
    console.log(formulario.check_in);
    console.log(formulario.check_out);
    console.log(this.hoteles);
  }

  getCiudadDeDestino(destino: string) {
    return destino.substring(0, destino.indexOf(','));
  }
}
