import { Component, OnInit } from '@angular/core';
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

  constructor(private servicio: HotelesService) {}

  async ngOnInit() {
    this.hoteles = await this.servicio.getHoteles();
    this.destinos = await this.servicio.getDestinos();
    console.log(this.hoteles);
    console.log(this.destinos);
  }
}
