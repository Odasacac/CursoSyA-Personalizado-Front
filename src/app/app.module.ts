import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { MainComponent } from "./components/main/main.component";
import { TiempoComponent } from "./components/tiempo/tiempo.component";
import { AppRoutingModule } from "./app-routing.module";

import { ReactiveFormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";


//El appModule es el modulo principal que viene en el proyecto base
//Los modulos son la forma que tiene Angular de organizar las aplicaciones
//Son contenedores que agrupan componentes, servicios y otros recursos
//La notacion @NgModule marca esta clase como un modulo de Angular

@NgModule({
    declarations: [//Aqui van a ir todos los componentes que pertenecen al modulo, si no se ponen no aparecen
        //Como este es el AppModule, han de ir todos los componentes
        AppComponent,
        NavbarComponent,
        MainComponent,
        TiempoComponent
    ],
    imports: [//Aqui van a ir los modulos necesarios para el funcionamiento de este modulo
        
        BrowserModule, //BrowserModule es esencial para que la aplicacion se ejecute en un navegador

        AppRoutingModule, //Para poderse mover entre componentes

        ReactiveFormsModule, //El reactive module es para manejar formularios

        HttpClientModule //Para poder utilizar las peticiones http
    ],
    providers: [], //Aqui iran los servicios

    bootstrap: [AppComponent] //Finalmente se indica que componente se carga cuando la aplicacion se inicia
})

export class AppModule
{
        
}
