import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrl: './mensajes.component.css'
})
export class MensajesComponent 
{
  private snackBar = inject(MatSnackBar);
  private dialogRef=inject(MatDialogRef);
  public data = inject (MAT_DIALOG_DATA); //Esto es para poder recibir los datos
  //Peero hay que extraerlos, porque estan en formato objeto
  public nombre=this.data.nombre;
  public correo=this.data.correo;
  public mensaje=this.data.mensaje;


  closeDialog() 
{
  this.dialogRef.close();
}

}
