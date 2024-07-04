import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{

//Texto para el boton
public nombre: string = "Mostrar menu del componente";

  //Array para el ngFor
  public ciudades: string[] = ['Barcelona', 'Madrid', 'Sevilla', 'Valencia'];

  //Boolean para el ngIF

  public showCiudad: boolean = true;

  //Boolean para el ngClass

  public changeCSS: boolean = true;

  //Boolean para mostrar el menu especifico

  public showMenuEspecifico: boolean = false;

  ngOnInit()
  {

  }

  //Generamos un metodo para mostrar/esconder ciudades

  mostrar()
  {
    this.showCiudad=!this.showCiudad;
  }

//Metodo para cambiar el CSS

  cambioCSS()
  {
    this.changeCSS=!this.changeCSS;
  }

  //Metodo para mostrar o no el menu

  
  mostrarMenu()
  {
    this.showMenuEspecifico=!this.showMenuEspecifico;
    if(this.showMenuEspecifico)
      {
       this.nombre = "Esconder menu del componente";
      }
      else
      {
        this.nombre = "Mostrar menu del componente";
      }
  }


}
