import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUnidadmedida'
})
export class FilterUnidadmedidaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultunidades = [];
    try {
      for (const Unidades of value) {
       
        if (Unidades.abrevunidadmedida.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultunidades.push(Unidades);
        }
        else
        if (Unidades.nomunidadmedida.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultunidades.push(Unidades);
        }
      }
    }
    catch (err) { }
    return resultunidades;
  }

}
