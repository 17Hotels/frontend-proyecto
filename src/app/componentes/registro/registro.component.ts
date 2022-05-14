import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RespuestaUsuario } from 'src/app/modelo/respuesta-usuario';
import { UsuarioRegistro } from 'src/app/modelo/usuario-registro';
import { HotelesService } from 'src/app/servicio/hoteles.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioRegistro = {
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
  };
  detallesUsuario!: RespuestaUsuario | null;
  confirmarPassword!: string;
  mensaje!: string;
  urlAnterior!: string;

  constructor(
    private servicio: HotelesService,
    private router: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  async registrarse() {
    if (this.usuario.password === this.confirmarPassword) {
      this.detallesUsuario = await this.servicio
        .registro(this.usuario)
        .catch(() => {
          return null;
        });

      if (this.detallesUsuario == null) {
        document.getElementById('email')?.focus();
        this.mensaje = 'Ya existe un usuario registrado con este email';
      } else {
        // Registrado con éxito, inicia sesión automáticamente
        localStorage.setItem('usuario', JSON.stringify(this.detallesUsuario));
        localStorage.setItem(
          'foto',
          `https://ui-avatars.com/api/?name=${this.detallesUsuario.nombre}&background=random`
        );
        this.servicio.isUserLoggedIn.next(true);

        this.ruta.queryParams.subscribe(
          (params) => (this.urlAnterior = params['urlAnterior'])
        );
        this.urlAnterior == undefined
          ? this.router.navigateByUrl(this.router.url)
          : this.router.navigateByUrl(this.urlAnterior);
      }
    } else {
      this.mensaje = 'Las contraseñas no coinciden';
      document.getElementById('password')?.focus();
      this.confirmarPassword = '';
    }
  }
}
