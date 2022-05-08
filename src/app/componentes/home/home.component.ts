import { Component, OnInit } from '@angular/core';
import { HotelesService } from 'src/app/servicio/hoteles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  destinos!: string[];
  constructor(private servicio: HotelesService) {}

  async ngOnInit() {
    this.destinos = await this.servicio.getDestinos();
    console.log(this.destinos);
  }
}
