import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    const resultadoBien = [];
    for (const bien of value) {
      if (bien.bien_descripcion.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultadoBien.push(bien);
        console.log('si');
      }
    }
    return resultadoBien;
  }
}
