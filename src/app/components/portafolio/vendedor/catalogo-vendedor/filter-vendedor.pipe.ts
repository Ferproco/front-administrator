import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterVendedor'
})
export class FilterVendedorPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultvendedores = [];
    try {
      for (const vendedor of value) {
        if (vendedor.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultvendedores.push(vendedor);
        }
        else
          if (vendedor.codigo.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
            resultvendedores.push(vendedor);
          }
      }
    }
    catch (err) { }
    return resultvendedores;
  }

}
