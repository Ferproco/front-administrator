import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategoria'
})
export class FilterCategoriaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultcategoria = [];
    try {
      for (const categoria of value) {
        
          if (categoria.nomfamilia.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
            resultcategoria.push(categoria);
          }
      }
    }
    catch (err) { }
    return resultcategoria;
  }

}
