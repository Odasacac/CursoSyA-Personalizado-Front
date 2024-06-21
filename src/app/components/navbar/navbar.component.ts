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
  //Aqui va el codigo
  //Es el archivo controlador que hace el match entre el modelo, lo que obtengamos de datos y la vista
}
