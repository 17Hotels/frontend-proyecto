import { Component, OnInit } from '@angular/core';
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
  usuarioDetalles!: RespuestaUsuario | null;
  confirmarPassword!: string;
  mensaje!: string;

  constructor(private servicio: HotelesService) {}

  ngOnInit(): void {}

  async registrarse() {
    if (this.usuario.password !== this.confirmarPassword) {
      this.mensaje = 'Las contraseñas no coinciden';
      document.getElementById('password')?.focus();
      this.confirmarPassword = '';
    } else {
      this.usuarioDetalles = await this.servicio
        .registro(this.usuario)
        .catch(() => {
          console.log('ya existe el usuario con ese email');
          return null;
        });

      if (this.usuarioDetalles == null) {
        document.getElementById('email')?.focus();
        this.mensaje = 'Ya existe un usuario registrado con este email';
      }
    }
  }
}
