import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Destino } from 'src/app/modelo/destino';
import { HotelesService } from 'src/app/servicio/hoteles.service';

@Component({
  selector: 'app-seleccion-destino',
  templateUrl: './seleccion-destino.component.html',
  styleUrls: ['./seleccion-destino.component.css'],
})
export class SeleccionDestinoComponent implements OnInit {
  destinos!: string[];
  destino: Destino = {
    destino: '',
    check_in: undefined,
    check_out: undefined,
  };

  constructor(
    private servicio: HotelesService,
    private router: Router,
    private ruta: ActivatedRoute
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  async ngOnInit() {
    this.destinos = await this.servicio.getDestinos();
    this.ruta.queryParams.subscribe((params) => {
      this.destino.destino = params['destino'];
      this.destino.check_in = params['check_in'];
      this.destino.check_out = params['check_out'];
    });
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
