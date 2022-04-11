import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RespuesHabitacion } from 'src/app/modelo/respuesta-habitacion';
import { RespuestaHotel } from 'src/app/modelo/respuesta-hotel';
import { HotelesService } from 'src/app/servicio/hoteles.service';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.css'],
})
export class HabitacionesComponent implements OnInit {
  habitaciones!: RespuesHabitacion[];
  hotel!: RespuestaHotel;
  idHotel!: number;

  constructor(private servicio: HotelesService, private ruta: ActivatedRoute) {}

  async ngOnInit() {
    this.ruta.params.subscribe(
      (parametros) => (this.idHotel = parametros['idHotel'])
    );
    this.habitaciones = await this.servicio.getHabitacionesHotel(this.idHotel);
    console.log(this.habitaciones);
    this.hotel = await this.servicio.getHotel(this.idHotel);
    console.log(this.hotel);
  }
}
