import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


//Este es el componente del MatDialog

@Component({
  selector: 'dialog-content', //Este es el nombre del dialog

  //El template se hace aqui, un poco rollo porque todo es con Strings
  template: 
  `

    <h1 mat-dialog-title  style="width: 500px;">Hola, soy un Dialog</h1>
    <div mat-dialog-content>
      <p>Realmente soy un componente aparte, pero me abro aqui en pequeñito y encima de todo.</p>
      <p>Esto puede extenderse, por ejemplo con un mat-select.</p>
      <mat-form-field appearance="fill"  style="width: 500px;">
        <mat-label>Clicka para ver las opciones del Dialog</mat-label>
        <mat-select>
          <mat-option value="opcion1">Opción 1 Dial</mat-option>
          <mat-option value="opcion2">Opción 2 Dial</mat-option>
          <mat-option value="opcion3">Facilito esto</mat-option>
        </mat-select>
      </mat-form-field>
      <p>O con botones, para cerrar la ventana o para ir a Main, por ejemplo.</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="closeDialog()">Cerrar Dialog</button>
      <button mat-button [routerLink]="'/home'" (click)="closeDialog()" (click)="openSnackBar('Vamos a Home', 'Mas adelante se explican los SnackBars', 5000)"><mat-icon>home</mat-icon>Ir a Home</button>
    </div>
    <div mat-dialog-content>
      <p>Indicamos en un SnackBar si se va a Home.</p>
    </div>

  `
})
export class DialogContentComponent 
{
  private dialogRef=inject(MatDialogRef);

//Esto para inyectar el MatSnackBar
private snackBar = inject(MatSnackBar);

closeDialog() 
 {
    this.dialogRef.close();
 }

//Para el SnackBar
  openSnackBar(message: string, action: string, duration: number) 
{
  this.snackBar.open(message, action, {duration: duration,});
}

}
