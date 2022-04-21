import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  check_in!: string;
  check_out!: string;

  constructor(
    private servicio: HotelesService,
    private ruta: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.ruta.params.subscribe((parametros) => {
      this.idHotel = parametros['idHotel'];
    });
    this.ruta.queryParams.subscribe((params) => {
      this.check_in = params['check_in'];
      this.check_out = params['check_out'];
    });

    this.habitaciones = await this.servicio.getHabitacionesHotel(this.idHotel);
    console.log(this.habitaciones);
    this.hotel = await this.servicio.getHotel(this.idHotel);
    console.log(this.hotel);
  }

  reservarHabitacion(idHabitacion: number) {
    this.router.navigate([`/reservar/${idHabitacion}`], {
      queryParams: {
        check_in: this.check_in,
        check_out: this.check_out,
      },
    });
  }
}
