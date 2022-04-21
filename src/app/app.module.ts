import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { HomeComponent } from './componentes/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FooterComponent } from './componentes/footer/footer.component';
import { HotelesComponent } from './componentes/hoteles/hoteles.component';
import { SeleccionDestinoComponent } from './componentes/seleccion-destino/seleccion-destino.component';
import { HabitacionesComponent } from './componentes/habitaciones/habitaciones.component';
import { ReservarHabitacionComponent } from './componentes/reservar-habitacion/reservar-habitacion.component';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    HotelesComponent,
    SeleccionDestinoComponent,
    HabitacionesComponent,
    ReservarHabitacionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AutocompleteLibModule,
    FormsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
