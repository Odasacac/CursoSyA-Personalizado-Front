import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{

  //Array para el ngFor
  public ciudades: string[] = ['Barcelona', 'Madrid', 'Sevilla', 'Valencia'];

  //Boolean para el ngIF

  public showCiudad: boolean = true;

  //Boolean para el ngClass

  public changeCSS: boolean = true;

  ngOnInit()
  {

  }

  //Generamos un metodo para mostrar/esconder ciudades

  mostrar()
  {
    this.showCiudad=!this.showCiudad;
  }

  cambioCSS()
  {
    this.changeCSS=!this.changeCSS;
  }

}
