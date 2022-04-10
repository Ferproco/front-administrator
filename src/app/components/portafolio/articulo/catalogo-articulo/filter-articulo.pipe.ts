import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArticulo'
})
export class FilterArticuloPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultarticulos = [];
    try {
      for (const articulo of value) {
        if (articulo.codigo.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultarticulos.push(articulo);
        }
        else
          if (articulo.nomarticulo.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
            resultarticulos.push(articulo);
          }
      }
    }
    catch (err) { }
    return resultarticulos;
  }

}
