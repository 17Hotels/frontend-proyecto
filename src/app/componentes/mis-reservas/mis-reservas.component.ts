import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RespuestaReserva } from 'src/app/modelo/respuesta-reserva';
import { RespuestaUsuario } from 'src/app/modelo/respuesta-usuario';
import { HotelesService } from 'src/app/servicio/hoteles.service';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css'],
})
export class MisReservasComponent implements OnInit {
  reservas!: RespuestaReserva[];

  constructor(private servicio: HotelesService, private router: Router) {}

  async ngOnInit() {
    if (!this.servicio.isUserLoggedIn.value) {
      this.router.navigate(['/login'], {
        queryParams: { urlAnterior: 'mis-reservas' },
      });
    }

    let usuarioString = localStorage.getItem('usuario');
    let usuario: RespuestaUsuario =
      usuarioString != null ? JSON.parse(usuarioString) : null;

    this.reservas = await this.servicio.getReservasUsuario(usuario.id);
    console.log(this.reservas);
  }
}
