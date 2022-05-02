import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RespuestaUsuario } from 'src/app/modelo/respuesta-usuario';
import { Usuario } from 'src/app/modelo/usuario';
import { HotelesService } from 'src/app/servicio/hoteles.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario: Usuario = {
    email: '',
    password: '',
  };
  detallesUsuario!: RespuestaUsuario | null;
  mensaje!: string;

  constructor(private servicio: HotelesService, private router: Router) {}

  ngOnInit(): void {}

  async login() {
    this.detallesUsuario = await this.servicio.login(this.usuario).catch(() => {
      console.log('Error');
      return null;
    });

    if (this.detallesUsuario == null) {
      this.usuario.password = '';
      this.mensaje = 'Usuario o contraseña incorrectos';
    } else {
      this.mensaje = '';
      this.router.navigateByUrl('/home');
    }
  }
}
