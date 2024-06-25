import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

//Vamos a usar esta clase para crear metodos que sean validaciones y a la cual se pueda acceder desde cualquier parte del proyecto

export class UtilService {

  constructor() { }

  noBarcelona(control: FormControl) //Recibe como parametro un FormControl
  {
      const value: string = control.value?.trim().toLowerCase();
      
      //Es decir, declaramos una constante llamada value que es de tipo String
      //La cual recibe el valor de control si no es nulo, elimina los espacios y lo deja en minusculas

      //Evaluamos
      if (value === 'barcelona') //Si value es barcelona
        {
          return {noBarcelona: true}; //Devuelve un objeto literal (llamado object) con la propiedad noBarcelona true 
        }
        return null; //Si no
  }

}
