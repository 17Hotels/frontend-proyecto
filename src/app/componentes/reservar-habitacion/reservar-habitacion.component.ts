import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NuevaReserva } from 'src/app/modelo/nueva-reserva';
import { RespuesHabitacion } from 'src/app/modelo/respuesta-habitacion';
import { RespuestaHotel } from 'src/app/modelo/respuesta-hotel';
import { RespuestaReserva } from 'src/app/modelo/respuesta-reserva';
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

  reserva!: RespuestaReserva;
  numHuespedes: number = 1;
  desayuno: boolean = false;
  precioTotal!: number;

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

    this.habitacion = await this.servicio.getHabitacion(this.idHabitacion);
    this.hotel = await this.servicio.getHotel(this.habitacion.idHotel);
    this.precioTotal = this.habitacion.precioNoche * this.numeroDeNoches;
  }

  calcularNumeroDeNoches() {
    const fechaInicio = new Date(this.check_in);
    const fechaFin = new Date(this.check_out);
    const diferencia = fechaFin.getTime() - fechaInicio.getTime();
    this.numeroDeNoches = Math.round(diferencia / (1000 * 60 * 60 * 24));
  }

  async confirmarReserva() {
    let nuevaReserva: NuevaReserva = {
      idHabitacion: this.idHabitacion,
      idUsuario: 1,
      numeroHuespedes: this.numHuespedes,
      fechaEntrada: new Date(this.check_in),
      fechaSalida: new Date(this.check_out),
      desayuno: this.desayuno,
    };

    this.reserva = await this.servicio.nuevaReserva(nuevaReserva);
    console.log(this.reserva);

    this.router.navigate([`/reserva-confirmada/${this.reserva.id}`], {});
  }

  calcularPrecioTotal() {
    if (this.desayuno) {
      this.precioTotal =
        this.numeroDeNoches * this.habitacion.precioNoche +
        this.habitacion.precioDesayuno! * this.numeroDeNoches;
    } else {
      this.precioTotal = this.habitacion.precioNoche * this.numeroDeNoches;
    }
    console.log(this.desayuno);
  }
}
