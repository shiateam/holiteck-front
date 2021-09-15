import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'persianNumber'
})
export class PersianNumberPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return value.toLocaleString('fa-IR');
  }
  // 'fa-IR'
}
