import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class MensajesService 
{
    
  //Este es el servicio para todo el tema de los mensajes
  //Como habra consultas Http, hay que inyectar las dependencias del HttpClient
  //Y ademas, hay que tener la url
  
  //Creamos un objeto tipo HttpClient llamado http
  private http = inject(HttpClient);
  //Y una constante con la URL
  private base_url: string = "http://localhost:8080/api/v1";

  //Declaramos el metodo para obtener todos los mensajes
  getMensajes()
  {
    const endpoint = `${this.base_url}/mensajes`; //El endpoint sera la ruta completa
    return this.http.get(endpoint); //Y aqui llamamos al metodo get del objeto http pasandole como parametro el endpoint
    //Basicamente esto llamara al metodo buscarMensaje() del controlador
  }


  //Declaramos el metodo para guardar un mensaje
  saveMensaje(body:any) //En este caso el metodo guardarMensaje() necesita un objeto Mensaje
  {
    const endpoint = `${this.base_url}/mensajes`; //El endpoint sera la ruta completa
    return this.http.post(endpoint, body); //Y aqui llamamos al metodo post del objeto http pasandole como parametro el endpoint y el body
    //Basicamente esto llamara al metodo guardarMensaje() del controlador
  }



  //Declaramos el metodo para eliminar un mensaje
  deleteMensaje(id: number)
  {
    const endpoint = `${this.base_url}/mensajes/${id}`; //El endpoint sera la ruta completa
    return this.http.delete(endpoint);
  }
}
