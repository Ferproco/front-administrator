import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTransacciones'
})
export class FilterTransaccionesPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resulttransacciones = [];
    try {
      for (const Transaccion of value) {
        if (Transaccion.nombrearticulo.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resulttransacciones.push(Transaccion);
        }
        
      }
    }
    catch (err) { }
    return resulttransacciones;
  }

}
