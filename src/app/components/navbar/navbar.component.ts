import { Component } from '@angular/core';

//Esta notacion indica que es un componente
@Component({
  //Se declaran algunas propiedades
  selector: 'app-navbar', //Con el selector se puede cargar este componente desde otro componente
  templateUrl: './navbar.component.html', //El archivo html donde se aloja este componente
  styleUrl: './navbar.component.css' //El archivo css del componente 
})
export class NavbarComponent 
{
   //Este boolean es para el ngIF del boton del menu del navbar, para mostrarlo u ocultarlo segun sea true o false
  public showMenu: boolean = false;

  //Y este es el metodo que cambia el valor del booleano, que se llama cuando se pulsa el boton
  mostrar()
  {
    this.showMenu=!this.showMenu;
  }

  //Este es el metodo que cierra la aplicacion
  //Pero no funciona debido a la seguridad del navegador sobre window.close()
  cerrar()
  {
    window.close();
  }

  // Y este es el metodo que enlaza con una web externa
  aWeb()
  {
    window.open('https://www.google.com', '_blank');
  }




}
