import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RespuestaUsuario } from 'src/app/modelo/respuesta-usuario';
import { HotelesService } from 'src/app/servicio/hoteles.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  usuarioString!: string | null;
  usuario!: RespuestaUsuario;
  foto!: string | null;
  isUserLoggedIn!: boolean;

  constructor(private servicio: HotelesService, private router: Router) {}

  ngOnInit(): void {
    this.setIsUserLoggedIn(); // Comprobamos si el usuario está logueado cuando se carga la página

    // Suscripción a la variable isUserLoggedIn del servicio, si el usuario está logueado se carga la foto y la información del usuario
    this.servicio.isUserLoggedIn.subscribe((value) => {
      this.isUserLoggedIn = value;

      if (this.isUserLoggedIn) {
        this.getDetallesUsuario();
      }
    });
  }

  irLogin() {
    console.log(this.router.url);
    console.log(decodeURIComponent(this.router.url));
    this.router.navigate(['/login'], {
      queryParams: { urlAnterior: this.router.url },
    });
  }

  logout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('foto');
    this.servicio.isUserLoggedIn.next(false);
  }

  setIsUserLoggedIn() {
    if (localStorage.getItem('usuario') != null) {
      this.servicio.isUserLoggedIn.next(true);
    } else {
      this.servicio.isUserLoggedIn.next(false);
    }
  }

  getDetallesUsuario() {
    this.usuarioString = localStorage.getItem('usuario');
    this.usuario =
      this.usuarioString != null ? JSON.parse(this.usuarioString) : null;
    this.foto = localStorage.getItem('foto');
  }
}
