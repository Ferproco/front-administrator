import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterFormapago'
})
export class FilterFormapagoPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultformaspago = [];
    try {
      for (const formapago of value) {
        if (formapago.id.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultformaspago.push(formapago);
        }
        else
          if (formapago.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
            resultformaspago.push(formapago);
          }
      }
    }
    catch (err) { }
    return resultformaspago;
  }

}
