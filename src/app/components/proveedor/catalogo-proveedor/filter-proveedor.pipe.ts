import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProveedor'
})
export class FilterProveedorPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultproveedores = [];
    try {
      for (const Proveedores of value) {
        if (Proveedores.rif.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultproveedores.push(Proveedores);
        }
        else
        if (Proveedores.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultproveedores.push(Proveedores);
        }
      }
    }
    catch (err) { }
    return resultproveedores;
  }

}
