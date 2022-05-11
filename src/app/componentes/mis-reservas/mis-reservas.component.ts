import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from 'src/app/modelo/reserva';
import { RespuesHabitacion } from 'src/app/modelo/respuesta-habitacion';
import { RespuestaHotel } from 'src/app/modelo/respuesta-hotel';
import { RespuestaReserva } from 'src/app/modelo/respuesta-reserva';
import { RespuestaUsuario } from 'src/app/modelo/respuesta-usuario';
import { HotelesService } from 'src/app/servicio/hoteles.service';
declare function activarToastsBootstrap(): any;

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css'],
})
export class MisReservasComponent implements OnInit {
  respuestaReservas!: RespuestaReserva[];
  reservas: Reserva[] = [];
  habitacion!: RespuesHabitacion;
  hotel!: RespuestaHotel;

  constructor(
    private servicio: HotelesService,
    private router: Router,
    private ruta: ActivatedRoute
  ) {}

  async ngOnInit() {
    if (!this.servicio.isUserLoggedIn.value) {
      this.router.navigate(['/login'], {
        queryParams: { urlAnterior: 'mis-reservas' },
      });
    }

    let usuarioString = localStorage.getItem('usuario');
    let usuario: RespuestaUsuario =
      usuarioString != null ? JSON.parse(usuarioString) : null;

    this.respuestaReservas = await this.servicio.getReservasUsuario(usuario.id);

    // Añadir la habitación y el hotel a la reserva en base a los ids
    for (let r of this.respuestaReservas) {
      let habitacion: RespuesHabitacion = await this.servicio.getHabitacion(
        r.idHabitacion
      );

      let reserva: Reserva = {
        id: r.id,
        habitacion: habitacion,
        hotel: await this.servicio.getHotel(habitacion.idHotel),
        idUsuario: r.idUsuario,
        numeroHuespedes: r.numeroHuespedes,
        fechaEntrada: r.fechaEntrada,
        fechaSalida: r.fechaSalida,
        precioTotal: r.precioTotal,
        desayuno: r.desayuno,
      };
      this.reservas.push(reserva);
    }
    this.ruta.queryParams.subscribe((parametros) => {
      parametros['urlAnterior'] == 'reservar' ? activarToastsBootstrap() : null;
    });
  }
}
