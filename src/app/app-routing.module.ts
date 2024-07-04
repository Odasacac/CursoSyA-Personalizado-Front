import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent} from './components/main/main.component';
import { TiempoComponent } from './components/tiempo/tiempo.component';
import { NewComponentComponent } from './components/new-component/new-component.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { MostrarmensajesComponent } from './components/mostrarmensajes/mostrarmensajes.component';
import { EmailComponent } from './components/email/email.component';


//Este modulo es el modulo de rutas
//Se encarga de determinar la ruta de cada componente para saber cómo acceder a cada uno de ellos.
//Para ello, creamos un array que contiene la relación entre ruta y componente.

const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'time', component: TiempoComponent},
  {path: 'new', component: NewComponentComponent},
  {path: 'home', component: BienvenidaComponent},
  {path: 'mostrar', component: MostrarmensajesComponent},
  {path: 'email', component: EmailComponent},
  {path: '', redirectTo: '/home', pathMatch:'full'},
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
