import { Component, OnInit, inject } from '@angular/core';
import { DialogContentComponent } from '../../others/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MensajesService } from '../../services/mensajes/mensajes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-component',
  templateUrl: './new-component.component.html',
  styleUrl: './new-component.component.css'
})

//Crear un nuevo componente

//1 - Facilito: ng g c "ruta", en este caso ha sido ng g c components/newComponent

//2 - Luego, hay que ir a la app-routing.module y ahi poner el path para poder llegar a ese componente
//{path: 'new', component: NewComponentComponent}

//3 - Ya con el path, crear un boton o lo que sea y donde sea para que al ejecutarlo se vaya a la ruta
//En este caso, un boton en el navbar:
//<a class="nav-link active" [routerLink]="'/new'" href="#">New</a>

//4 - Finalmente, aunque esto suele hacerse automatico, incluir el nuevo componente en declarations de app.module.ts

export class NewComponentComponent implements OnInit
{

  //VARIABLES 



    //Vamos a determinar los textos de la pagina con variables
    public textoEncabezado: string = "Pruebas con Angular Material";

    //Boolean para mostrar o no el menu
    public showMenuEspecifico: boolean = false;

    //Esto es para inyectar el MatDialog

    private dialog = inject(MatDialog);

    //Esto para inyectar el MatSnackBar

    private snackBar = inject(MatSnackBar);

    //Para el formulario

    //n Angular, hay dos enfoques principales para trabajar con formularios: Template-driven Forms y Reactive Forms. 
    //En este caso, utilizaremos Reactive Forms, que ofrece más flexibilidad y control sobre la lógica del formulario desde el código TypeScript.
    
    public formulario!: FormGroup; //Public que si no no se puede acceder a el

    //FormGroup: representa un grupo de controles (campos) que están relacionados entre sí dentro de un formulario. 
    //Su propósito principal es proporcionar una estructura para gestionar y validar múltiples campos de formulario de manera conjunta

    //formulario: es un objeto de tipo FormGroup.

    //Inyectamos el FormBuilder, que es un servicio de Angular que proporciona metodos para crear formularios
    private fb = inject(FormBuilder);
    //Con el metodo crearFormulario() que esta en la seccion de METODOS, creamos el formulario
    //El cual se inicializará cuando se cargue el componente porque se le llama en el ngOnInit

    //Voy a crear variables para probar cosas del objeto value de los formularios
    public campo1: string="Estoy vacio";
    public campo2: string="Estoy vacio";
    public campo3: string="Estoy vacio";
    public campo4: string="Estoy vacio";
    public fecha: Date = new Date();

    //Ahora inyecto las dependencias del MensajesServicio para poder guardar el mensaje
    private servicio = inject(MensajesService);

    //Este boolean para comprobar que se ha guardado correctamente
      public enviadoNo=false;
      private router = inject(Router);


    

  //METODOS

  ngOnInit(): void //Este metodo se ejecuta cuando se genera el componente
  {
    
    this.crearFormulario();
    //Entonces cuando se ejecute el componente cargamos el formulario
    //Si esto no estuviera aqui, el formulario no apareceria ya que solo se crea cuando se llama a este metodo.
  }

//Metodo para mostrar o no el menu

mostrarMenu()
{
  this.showMenuEspecifico=!this.showMenuEspecifico;
}

//Metodo para abrir el MatDialog
//Basicamente cuando se ejecute este metodo, se abrira el componente DialogContentComponent
//Importante, este metodo se puede poner en cualquier otro componente y llamara al mismo DialogContentComponent, es util por eso
openDialog() {
  this.dialog.open(DialogContentComponent);
}



//Metodo para abrir el SnackBar

//message: es el texto que se muestra dentro del SnackBar
//action: es el texto que se muestra en el boton de cerrar
//duration: es el tiempo en milisegundos que estará presente el SnackBar
openSnackBar(message: string, action: string, duration: number) 
{
  this.snackBar.open(message, action, {duration: duration,});
}




//Este método crea y configura el FormGroup para el formulario.

crearFormulario()
{
  this.formulario = this.fb.group({//Y este metodo de FormBuilder, crea y devuelve un objeto FormGroup
    //Primero definimos los campos del formulario con un valor inicial, que en este caso son vacios

    nombre: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    correo: ['',[Validators.required, Validators.email]], 
    academia: [''],
    mensaje: ['', Validators.required]

    //Tema validaciones
    //Aqui se ponen los metodos Validators, solo puse que sea requerido, longitud y que sea un email
    //Hay que ir al HTML para ver como sigue
  });
}


onSubmit() //se llama generalmente cuando el usuario envía el formulario.
{
  if (this.formulario.valid) //Si el formulario es válido, que esto se comprueba con los Validators
  {
    //Se guardan los valores del formulario en el objeto value del FormGroup asociado
    this.formulario.value; 
    //Para acceder a un valor concreto, es sencillo:
    //this.formulario.value['nombreDelCampo'];
    //Entonces, vamos guardar en variables los diferentes campos

    this.campo1=this.formulario.value['nombre'];
    this.campo2=this.formulario.value['correo'];
    this.campo3=this.formulario.value['academia'];
    this.campo4=this.formulario.value['mensaje'];
    this.fecha=new Date(); //Para actualizar la fecha siempre que se registre un formulario nuevo


  //Vale ahora como se hace, se crea una variable data y se le añaden los valores del objeto formulario
  //Ya que un objeto de tipo FormGroup no es un objeto que pueda ser enviado
  //Y: this.formulario.get('X')?.value,
  //Si la propiedad "X" no es nula, guardame el valor en el atributo Y

  let data = {
      nombre: this.formulario.get('nombre')?.value,
      correo: this.formulario.get('correo')?.value,
      academia: this.formulario.get('academia')?.value,
      mensaje: this.formulario.get('mensaje')?.value,

  }

    this.servicio.saveMensaje(data)
        .subscribe((data:any) => {
          this.openSnackBar("Mensaje enviado con éxito", "Cerrar", 3000)
          this.enviadoNo = false;
          this.router.navigate(['/main']);
        }, (error:any)=>
            {
              //Y si sale error, pues la variable enviadoNo se pondra como true y se mostrara en el HTML una alerta
              this.enviadoNo = true;
              console.log(error);
            });
  }
}

reiniciarFormulario()
{
  this.formulario.reset(); //No es lo mismo llamar al funcion reset que crear de nuevo el formulario, para mi si lo es pero vaya que es mejor hacer el reset
}


}