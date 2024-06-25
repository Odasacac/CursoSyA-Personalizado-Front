import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';


//Un API Rest es un servicio que está en el backend que al consumirla nos va a dar informacion

//Vamos a usar la API de www.openweathermap.org, que es para ver el tiempo
//La API será: Current Weather Data
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//La key es: 9c9b2d38b744bad0eac7f096e2953391
//Y la ciudad, la que queramos, London por ejemplo
//https://api.openweathermap.org/data/2.5/weather?q=London&appid=9c9b2d38b744bad0eac7f096e2953391

//Aunque se puede usar el propio navegador, usamos Postman para evaluar el servicio
//Creamos una nueva coleccion y dentro una request nueva que es tipo GET

const urlBase = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '9c9b2d38b744bad0eac7f096e2953391';

@Injectable({
  providedIn: 'root'
})
export class TiempoService 
{
    
  //Venimos al servicio ahora, lo primero es inyectar las dependencias del HttpClient
  //Recuerda que también puede hacerse con el constructor

  private http = inject(HttpClient);

  //Y ahora el metodo para obtener el estado del tiempo de la ciudad especifica
  
  getEstadoTiempo(ciudad: string, codigo: string)
  {
    const url = `${urlBase}?q=${ciudad},${ codigo }&appid=${apiKey}`;
    //Ojo que son `` y no '', así nos ahorramos usar el + para concatenar strings
    //Las constantes se ponen: ${constante}
    return this.http.get(url); //Llamamos al metodo get, pasandole la url como parametro
  }






}
