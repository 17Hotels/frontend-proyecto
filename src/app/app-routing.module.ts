import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HabitacionesComponent } from './componentes/habitaciones/habitaciones.component';
import { HomeComponent } from './componentes/home/home.component';
import { HotelesComponent } from './componentes/hoteles/hoteles.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ReservaConfirmadaComponent } from './componentes/reserva-confirmada/reserva-confirmada.component';
import { ReservarHabitacionComponent } from './componentes/reservar-habitacion/reservar-habitacion.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'hoteles', component: HotelesComponent },
  { path: 'hoteles/:idHotel/habitaciones', component: HabitacionesComponent },
  { path: 'reservar/:idHabitacion', component: ReservarHabitacionComponent },
  {
    path: 'reserva-confirmada/:idReserva',
    component: ReservaConfirmadaComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'registrarse', component: RegistroComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
