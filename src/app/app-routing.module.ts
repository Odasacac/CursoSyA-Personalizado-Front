import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent} from './components/main/main.component';
import { TiempoComponent } from './components/tiempo/tiempo.component';

//Este modulo es el modulo de rutas
//Se encarga de determinar la ruta de cada componente para saber cómo acceder a cada uno de ellos.
//Para ello, creamos un array que contiene la relación entre ruta y componente.

const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'time', component: TiempoComponent},
  {path: '', redirectTo: '/main', pathMatch:'full'},
  {path: '*', component: MainComponent}
 
  //Es decir, que cuando la ruta sea path, se llamara al componente component
  //Si no hay nada en la ruta, cargara Main

]

@NgModule({
  //En este caso "declarations:" no es necesario, ya que este modulo no contiene componentes
  imports: 
  [
      RouterModule.forRoot (routes) //Indicamos que este es el archivo de rutas principal
  ],
  exports:
  [
    RouterModule //Y con esto dejamos visible este modulo para que sea accesible desde otros lugares
  ]
})
export class AppRoutingModule { }
