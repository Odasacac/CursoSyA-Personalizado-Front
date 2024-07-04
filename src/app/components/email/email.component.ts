import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MensajesService } from '../../services/mensajes/mensajes.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionComponent } from '../../others/confirmacion/confirmacion.component';
import { MensajesComponent } from '../../others/mensajes/mensajes.component';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrl: './email.component.css'
})
export class EmailComponent implements OnInit
{
  displayedColumns: string [] = ['nombre', 'correo', 'academia', 'mensaje'];
  dataSource = new MatTableDataSource<MensajeElement>();
  private servicioMensajes = inject(MensajesService);
  public errorB: boolean = false;
  private dialog = inject(MatDialog);

  ngOnInit(): void 
    {
      this.getMensajes();
    }

    getMensajes():void
    {
        this.servicioMensajes.getMensajes() 

          .subscribe((data:any)=>{

              this.procesadoRespuestaMensajes (data);
              this.errorB = false;
        
          }, (error:any)=>
            {
              //Y si sale error, pues la variable Error se pondra como true y se mostrara en el HTML una alerta
              this.errorB = true;
            })

            

    }

    procesadoRespuestaMensajes (resp: any) 
    {
      const dataMensaje: MensajeElement[] = []; 
      if (resp.metadata[0].code=="00")
      {
        
         console.log(dataMensaje); 
        let listMensaje = resp.mensaje;

        listMensaje.forEach((element: MensajeElement)=>{
          dataMensaje.push(element);
        });

   

        this.dataSource=new MatTableDataSource<MensajeElement>(dataMensaje);

      }
}

leerMensaje(nombre: string, correo: string, mensaje: string)
{
  this.dialog.open(MensajesComponent , {data: {nombre:nombre, correo:correo, mensaje: mensaje}});
}
}
export interface MensajeElement
{
  id: number;
  nombre: string;
  correo: string;
  academia: string;
  mensaje: string;
}
