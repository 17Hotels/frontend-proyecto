import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RespuestaUsuario } from 'src/app/modelo/respuesta-usuario';
import { UsuarioLogin } from 'src/app/modelo/usuario-login';
import { HotelesService } from 'src/app/servicio/hoteles.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario: UsuarioLogin = {
    email: '',
    password: '',
  };
  detallesUsuario!: RespuestaUsuario | null;
  mensaje!: string;
  urlAnterior!: string;

  constructor(
    private servicio: HotelesService,
    private router: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.servicio.isUserLoggedIn.value) {
      this.router.navigateByUrl('/home');
    }
  }

  async login() {
    this.detallesUsuario = await this.servicio.login(this.usuario).catch(() => {
      console.log('Usuario no encontrado');
      return null;
    });

    if (this.detallesUsuario == null) {
      this.usuario.password = '';
      this.mensaje = 'Usuario o contraseña incorrectos';
    } else {
      localStorage.setItem('usuario', JSON.stringify(this.detallesUsuario));
      localStorage.setItem(
        'foto',
        `https://randomuser.me/api/portraits/lego/${Math.floor(
          Math.random() * 9
        )}.jpg`
      );
      this.servicio.isUserLoggedIn.next(true);

      this.ruta.queryParams.subscribe(
        (params) => (this.urlAnterior = params['urlAnterior'])
      );
      this.urlAnterior == undefined
        ? this.router.navigateByUrl(this.router.url)
        : this.router.navigateByUrl(this.urlAnterior);
    }
  }
}
