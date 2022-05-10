import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NuevaValoracion } from 'src/app/modelo/nueva-valoracion';
import { RespuesHabitacion } from 'src/app/modelo/respuesta-habitacion';
import { RespuestaHotel } from 'src/app/modelo/respuesta-hotel';
import { RespuestaUsuario } from 'src/app/modelo/respuesta-usuario';
import { RespuestaValoracion } from 'src/app/modelo/respuesta-valoracion';
import { Valoracion } from 'src/app/modelo/valoracion';
import { HotelesService } from 'src/app/servicio/hoteles.service';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.css'],
})
export class HabitacionesComponent implements OnInit {
  habitaciones!: RespuesHabitacion[];
  respuestaValoraciones!: RespuestaValoracion[];
  hotel!: RespuestaHotel;
  idHotel!: number;
  check_in!: string;
  check_out!: string;

  comentario!: string;
  nota!: number;
  valoraciones: Valoracion[] = [];
  isUserLoggedIn: boolean = this.servicio.isUserLoggedIn.value;

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
    this.hotel = await this.servicio.getHotel(this.idHotel);
    await this.getValoraciones();
  }

  reservarHabitacion(idHabitacion: number) {
    this.router.navigate([`/reservar/${idHabitacion}`], {
      queryParams: {
        check_in: this.check_in,
        check_out: this.check_out,
      },
    });
  }

  async enviarValoracion() {
    let usuarioString = localStorage.getItem('usuario');
    let usuario: RespuestaUsuario =
      usuarioString != null ? JSON.parse(usuarioString) : null;

    let valoracion: NuevaValoracion = {
      idUsuario: usuario.id,
      idHotel: this.idHotel,
      comentario: this.comentario,
      fecha: new Date(),
      nota: this.nota,
    };
    let val: RespuestaValoracion = await this.servicio.valorarHotel(valoracion);
    await this.getValoraciones();
    this.comentario = '';
    this.nota = 0;

    this.router.navigateByUrl(this.router.url);
  }

  async getValoraciones() {
    this.valoraciones = [];
    this.respuestaValoraciones = await this.servicio.getValoracionesHotel(
      this.idHotel
    );
    for (let v of this.respuestaValoraciones) {
      let valoracion: Valoracion = {
        id: v.id,
        usuario: await this.servicio.getUsuario(v.idUsuario),
        hotel: await this.servicio.getHotel(v.idHotel),
        comentario: v.comentario,
        fecha: v.fecha,
        nota: v.nota,
      };
      this.valoraciones.push(valoracion);
    }
    console.log('valoraciones: ', this.valoraciones);
  }
}
