import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAlmacen'
})
export class FilterAlmacenPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultalmacenes = [];
    try {
      for (const Almacenes of value) {
       
        if (Almacenes.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
            resultalmacenes.push(Almacenes);
        }
      }
    }
    catch (err) { }
    return resultalmacenes;
  }

}
