import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RespuesHabitacion } from 'src/app/modelo/respuesta-habitacion';
import { RespuestaHotel } from 'src/app/modelo/respuesta-hotel';
import { HotelesService } from 'src/app/servicio/hoteles.service';

@Component({
  selector: 'app-reservar-habitacion',
  templateUrl: './reservar-habitacion.component.html',
  styleUrls: ['./reservar-habitacion.component.css'],
})
export class ReservarHabitacionComponent implements OnInit {
  idHabitacion!: number;
  habitacion!: RespuesHabitacion;
  hotel!: RespuestaHotel;
  check_in!: string;
  check_out!: string;
  numeroDeNoches!: number;

  constructor(
    private servicio: HotelesService,
    private ruta: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.ruta.params.subscribe(
      (parametros) => (this.idHabitacion = parametros['idHabitacion'])
    );
    this.ruta.queryParams.subscribe((params) => {
      this.check_in = params['check_in'];
      this.check_out = params['check_out'];
    });
    this.calcularNumeroDeNoches();
    console.log('Num noches: ' + this.numeroDeNoches);

    this.habitacion = await this.servicio.getHabitacion(this.idHabitacion);
    this.hotel = await this.servicio.getHotel(this.habitacion.idHotel);
    console.log(this.habitacion);
  }

  calcularNumeroDeNoches() {
    const fechaInicio = new Date(this.check_in);
    const fechaFin = new Date(this.check_out);
    const diferencia = fechaFin.getTime() - fechaInicio.getTime();
    this.numeroDeNoches = Math.round(diferencia / (1000 * 60 * 60 * 24));
  }
}
