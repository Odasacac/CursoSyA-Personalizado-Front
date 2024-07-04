import { Component, OnInit, inject } from '@angular/core';
import { MensajesService } from '../../services/mensajes/mensajes.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmacionComponent } from '../../others/confirmacion/confirmacion.component';




@Component({
  selector: 'app-mostrarmensajes',
  templateUrl: './mostrarmensajes.component.html',
  styleUrl: './mostrarmensajes.component.css'
})
export class MostrarmensajesComponent implements OnInit
{
  //Este componente es solo para la tabla que mostrara los mensajes


  //Esto es para el formulario de borrar
  public formulario!: FormGroup;
  private fb = inject(FormBuilder);
  private id: number=0;
  private snackBar = inject(MatSnackBar);
  private idValido=false;
 
  

  
  //displayedColumns es una propiedad que define el orden y la lista de columnas que se mostrarán en una tabla
  //En el HTML en la tabla debe encontrarse <ng-container matColumnDef="loQueSea"> y deben coincidir
  displayedColumns: string [] = ['id', 'nombre', 'correo', 'academia', 'mensaje'];

  //DataSource, se utiliza para proporcionar datos a la tabla mat-table
  //Para ello hay que definir la interfaz MensajeElement con los datos y el tipo de datos de la tabla
  dataSource = new MatTableDataSource<MensajeElement>();

  //Un boolean por si da error, poner una etiqueta
  public errorB: boolean = false; 

  //Y otro para mostar ocultar la tabla

  public mostrarOcultarB: boolean=true;
  public mostrarOcultarTexto: string="Esconder tabla";
  public icono: string="visibility";
  
  //Ya con la tabla hecha en el archivo HTML y el servicio que conecta con el back (MensajesService en este caso), lo primero aqui es el metodo getMensajes() 
  //Iria dentro del ngOnInit, pero voy a probar a ver si puedo hacer un boton que al pulsarlo se llene la tabla

  //Para el metodo getMensajes lo primero es inyectar el servicio de MensajesService, donde esta el metodo que getMensajes()

    private servicioMensajes = inject(MensajesService);
    private dialog = inject(MatDialog); //Tambien importamos el MatDialog para el Dialog para confirmar que se borra el mensaje

    ngOnInit(): void //Este metodo se ejecuta cuando se genera el componente
    {
      this.getMensajes();
      this.crearFormulario();
      //Entonces cuando se ejecute el componente cargamos el formulario
      //Si esto no estuviera aqui, el formulario no apareceria ya que solo se crea cuando se llama a este metodo.
    }


   //Una vez inyectada la dependencia, creamos el metodo getMensajes

    getMensajes():void //Devuelve void
    {
        this.servicioMensajes.getMensajes() //Llama al metodo getMensajes del servicio

          .subscribe((data:any)=>{//El tema del subscribe esta explicado en TiempoComponent -> consultar()

              this.procesadoRespuestaMensajes (data);
              this.errorB = false;
           
              //Es decir, que si se obtiene un objeto data, este se pasara como parametro al metodo procesadoRespuestasMensajes()

          }, (error:any)=>
            {
              //Y si sale error, pues la variable Error se pondra como true y se mostrara en el HTML una alerta
              this.errorB = true;
            })

            

    }

    procesadoRespuestaMensajes (resp: any) //Recibe un parametro llamado resp de tipo any
    {
      const dataMensaje: MensajeElement[] = []; //Se crea un Array de elements tipo MensajeElement
     
      if (resp.metadata[0].code=="00") //Si la respuesta es exitosa
      {
        //Creamos la variable listMensaje y la inicializamos con lo contenido en el atributo mensaje del objeto resp 
         console.log(dataMensaje); // Verifica los datos que estás asignando a dataSource
        let listMensaje = resp.mensaje;

        //Que basicamente es el data obtenido al ejecutar el getMensajes() del MensajeService Angular
        //Que si vamos al Spring veremos que es el metodo buscarMensaje() del controlador
        //El cual llama al metodo buscar() de la interfaz IMensajeServicio
        //El cual esta implementado en la clase MensajeServicio y es el que llena la Lista de los datos gracias al CrudRepository
        //Este metodo devuelve un objeto tipo Respuesta, con el atributo Lista llamado mensaje lleno
        //Que es lo que aqui viene a ser resp.mensaje

        //Lo que hacemos ahora es recorrer con un foreach para ir sacando cada elemento e ir incluyendolo al array de elements MensajeElement
        listMensaje.forEach((element: MensajeElement)=>{
          dataMensaje.push(element);
        });

        //Para luego añadir este Array al dataSource

        this.dataSource=new MatTableDataSource<MensajeElement>(dataMensaje);

      }
}
mostrarOcultar()
{
    this.mostrarOcultarB=!this.mostrarOcultarB;

    if(this.mostrarOcultarB)
      {
       this.mostrarOcultarTexto = "Esconder tabla";
       this.icono="person";
      }
      else
      {
        this.mostrarOcultarTexto = "Mostrar tabla";
        this.icono="link";
      }
}


//Vamos a hacer aqui el tema del formulario para recibir un numero y eliminar ese mensaje
//Ojo que no es del todo protocolariamente correcto poner variables debajo de metodos, pero bueno, esta mas ordenado para esto
//Esta explicado profundamente en el componente NewComponent


crearFormulario()
{
  this.formulario = this.fb.group({

    id: ['',[Validators.required, Validators.pattern(/^\d+$/)]],

    //El pattern ese es para que sea un numero entero y positivo
  });
}


onSubmit() 
{
  if (this.formulario.valid) 
  {
      this.id = Number(this.formulario.get('id')?.value); //Esto del Number() es para asegurarnos que this.id es un numero
      this.idValido=false;
      //Primero vamos a ver que ese ID realmente sea un ID valido en terminos de que haya un mensaje con ese ID

      //Accedemos al valor de la propiedad ID de cada objeto en dataSource
      //forEach se usa para iterar sobre elementos de un Array
   
      this.dataSource.data.forEach(item => 
        {
  
          //Básicamente, para cada item del data del dataSource vamos a comprar si la propiedad id es igual a this.id
           if(this.id === item.id)
            {
              this.idValido=true;
            }
         });

      if(this.idValido)
      {
        //Vamos a hacer que se abra un dialog preguntando si quiere efectivamente borrar este mensaje
        //Para ello hay que enviarle el id al componente ConfirmacionComponent
        this.dialog.open(ConfirmacionComponent , {data: {number:this.id}});
        //Ojo que se envia un objeto, no un int, en el Dialog hay que extraer la info
      }
      else
      {
        this.openSnackBar("No existe un mensaje con el ID "+this.id, "Cerrar", 3000);
      }
          
  }
  else
  {
    this.openSnackBar("ID incorrecto","Cerrar",3000);
  }
}

openSnackBar(message: string, action: string, duration: number) 
{
  this.snackBar.open(message, action, {duration: duration,});

}


}

//En esta interfaz indicamos los datos y el tipo de datos de la tabla
export interface MensajeElement
{
  id: number;
  nombre: string;
  correo: string;
  academia: string;
  mensaje: string;
}