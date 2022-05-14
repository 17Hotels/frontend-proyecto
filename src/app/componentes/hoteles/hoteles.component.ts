import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Destino } from 'src/app/modelo/destino';
import { RespuestaFoto } from 'src/app/modelo/respuesta-foto';
import { RespuestaHotel } from 'src/app/modelo/respuesta-hotel';
import { HotelesService } from 'src/app/servicio/hoteles.service';

@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.css'],
})
export class HotelesComponent implements OnInit {
  hoteles!: RespuestaHotel[];
  ciudad!: string;
  check_in!: string;
  check_out!: string;
  hotel!: RespuestaHotel;

  constructor(
    private servicio: HotelesService,
    private ruta: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.ruta.queryParams.subscribe((params) => {
      this.ciudad = this.getCiudadDeDestino(params['destino']);
      this.check_in = params['check_in'];
      this.check_out = params['check_out'];
    });

    this.hoteles = await this.servicio.getHotelesPorCiudad(this.ciudad);
  }

  getCiudadDeDestino(destino: string) {
    return destino.substring(0, destino.indexOf(','));
  }

  verHabitaciones(idHotel: number) {
    this.router.navigate([`/hoteles/${idHotel}/habitaciones`], {
      queryParams: {
        check_in: this.check_in,
        check_out: this.check_out,
      },
    });
  }
}
