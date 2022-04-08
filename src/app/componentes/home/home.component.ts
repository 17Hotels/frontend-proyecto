import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Destino } from 'src/app/modelo/destino';
import { RespuestaHotel } from 'src/app/modelo/respuesta-hotel';
import { HotelesService } from 'src/app/servicio/hoteles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  destinos!: string[];
  destino: Destino = {
    destino: '',
    check_in: undefined,
    check_out: undefined,
  };

  constructor(private servicio: HotelesService, private router: Router) {}

  async ngOnInit() {
    this.destinos = await this.servicio.getDestinos();
    console.log(this.destinos);
  }

  verHotelesCiudad(formulario: Destino) {
    this.router.navigate(['/hoteles'], {
      queryParams: {
        destino: formulario.destino,
        check_in: formulario.check_in,
        check_out: formulario.check_out,
      },
    });
  }
}
