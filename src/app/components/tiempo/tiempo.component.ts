import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from '../../services/validations/util.service';
import { TiempoService } from '../../services/tiempo/tiempo.service';

@Component({
  selector: 'app-tiempo',
  templateUrl: './tiempo.component.html',
  styleUrl: './tiempo.component.css'
})
export class TiempoComponent implements OnInit{

  //Vamos a hacer un formulario

  //Primero vamos a declarar un objeto llamado formulario de tipo FormGroup
  //La ! es importante para que el programa entienda que ese objeto será inicializado antes de su uso

  formulario!: FormGroup;

  //Despues, inyectamos la dependencia de FormBuilder
  //Tambien se puede hacer con el metodo del constructor, que seria:
  /*
    constructor (private fb: FormBuilder)
    {
      this.iniciaFormulario();
    }
  */
 //Pero a partir de Angular 4.7 se puede hacer con el inject, aunque se prefiere con el constructor porque es mas limpio
 //Ojo que si se hace con el inject el metodo iniciaFormulario() tiene que ir dentro del metodo ngOnInit

  private fb = inject(FormBuilder);

  private util = inject(UtilService); //Este servicio se usa en el metodo iniciaFormulario, pero ha de colocarse aqui

  private tiempo = inject(TiempoService); //Este servicio igual, se usa en el metodo consultar()

  //Aqui vamos a declarar ahora algunas variables para almacenar la respuesta del servicio de la API del tiempo

  weather: any;
  name: any;
  temperatura: any;
  humedad: any;
  latitud: any;
  longitud: any;
  descripcion: any;

  //Variables para los errores al consultar

  showError: boolean = false;
  mensajeError: string = "";

  //Y ahora una variable fecha para tontear con los Pipes

  fecha = new Date(); //Que prácticamente es lo mismo que: let fecha: Date = new Date();, solo que en la del comentario ya dices que fecha es de tipo Date

  //Boolean para mostrar el menu especifico
  public showMenuEspecifico: boolean = false;

  ngOnInit(): void
  {
    this.iniciaFormulario();
  }

  //Con el siguiente metodo creamos e iniciamos un formulario
    
  iniciaFormulario()
  {
      this.formulario = this.fb.group({ 
        
      //El .group({}) es un metodo de FormBuilder que crea un FormGroup. 
      //Un FormGroup es un conjunto de controles que pueden agruparse de forma logica

      ciudad: ['', [Validators.required, this.util.noBarcelona, Validators.pattern('^[a-zA-Z ]*$')]], //Definimos un campo llamado Ciudad con el valor inicial vacío
      codigo: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]], //Y aqui el campo codigo, con valor inicial vacio tambien

      //Tema validaciones:
      
      //Angular viene con una clase que tiene una amplia variedad de validaciones: Validator

      /*En este caso, las validaciones seleccionadas han sido:
        1 - Required, es decir que sea un campo requerido
        2 - Pattern, es decir, que admita una expresion regular, y en este caso la expresion regular va a ser solo letras*/

        //Ahora bien, validaciones personalizadas como, en este caso, que NO se pueda introducir como ciudad Barcelona
        //Para ello, lo ideal es crear una clase Servicio donde se codifiquen todas las validaciones personalizadas
        //ng g s services/validations/util Se crea un archivo util.service.ts en la carpeta validations dentro de la carpeta services
        //Y llamamos al metodo validador que hemos creado en la clase service.ts, el cual se coloca donde los otros validadores
        //this.util.noBarcelona, no hay que pasarle ningun parámetro porque el metodo entiende que el parametro es el valor de ciudad que es tipo FormControl
    });
  }

  consultar()
  {
    //Vamos a consumir el servicio tiempo.service.ts desde este componente
    //Para ello llamamos al metodo getEstadoTiempo y como parametro le pasamos el valor del campo ciudad y del campo codigo del formulario si no son nulos
    
    this.tiempo.getEstadoTiempo(this.formulario.get('ciudad')?.value, this.formulario.get('codigo')?.value)
      .subscribe((respuesta:any) => { 
          //Aqui recuperamos la respuesta y asignamos los campos
          //Basicamente en la variable weather se guarda la respuesta del metodo
          //Y para cada variable se accede al lugar de la respuesta en el que ese valor esta almacenado
          this.showError=false; 
          this.weather=respuesta;
          this.name=this.weather.name;
          this.temperatura=((this.weather.main.temp)- 273.15).toFixed(1); //Porque la pasan en Kelvin
          this.humedad=this.weather.main.humidity;
          this.latitud=this.weather.coord.lat;
          this.longitud=this.weather.coord.lon;
          this.descripcion=this.weather.weather[0].description;
      },

      //Cuando el servicio devuelva un error no entra en subscribe, sino que entra en error

      (error: any) => {
        this.showError=true; //Es decir, que hay un error
        this.mensajeError="Error al consultar el estado del tiempo.";
      })
      
      //Subscribe es un metodo que provee Angular cuando se consume un servicio
      //Lo que hace es suscribirse a la respuesta del método getEstadoTiempo
      //Esto quiere decir que cuando el metodo getEstadoTiempo termine su tarea, todos los componentes suscritos a él van a recibir una respuesta del servicio

  }


  mostrarMenu()
  {
    this.showMenuEspecifico=!this.showMenuEspecifico;
  }


}
