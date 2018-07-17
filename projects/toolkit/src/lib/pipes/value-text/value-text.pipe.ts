/**
 * Transform value to text
 */

import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'valueText'
})
export class ValueTextPipe implements PipeTransform {

  transform(value: any, list: any[], valueProp: string, textProp: string): string {
    if ((value === undefined) || (value === null) || !Array.isArray(list)) { return ''; }

    const item = list.find((i) => i[valueProp] === value);

    if (!item) { return ''; }

    return item[textProp] || '';
  }
}
