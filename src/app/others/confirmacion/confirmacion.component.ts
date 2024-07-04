import { Component, inject } from '@angular/core';
import { MensajesService } from '../../services/mensajes/mensajes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrl: './confirmacion.component.css'
})
export class ConfirmacionComponent
{
  private servicioMensajes = inject(MensajesService);
  private snackBar = inject(MatSnackBar);
  private dialogRef=inject(MatDialogRef);
  public data = inject (MAT_DIALOG_DATA); //Esto es para poder recibir los datos
  //Peero hay que extraerlos, porque estan en formato objeto tipo (en este caso): number: "1"
  private id=this.data.number;

 

  
  
openSnackBar(message: string, action: string, duration: number) 
{
  this.snackBar.open(message, action, {duration: duration,});
}

borrarMensaje()
{
  //Primero es ver si la data es distinto de nulo, es decir, si tiene un ID
  if (this.data!= null)
  {
    this.servicioMensajes.deleteMensaje(this.id)
    .subscribe((data:any)=>{
      this.dialogRef.close();
      this.openSnackBar("Mensaje eliminado", "Cerrar", 3000);
      

    }, (error: any) =>
      {
        this.dialogRef.close();
        this.openSnackBar("Error al eliminar el mensaje: "+error, "Cerrar", 3000);
      })
  }
  else
  {
    this.dialogRef.close();
    this.openSnackBar("Error, data vacía", "Cerrar", 3000);
  } 
}

closeDialog() 
{
  this.dialogRef.close();
}

}
