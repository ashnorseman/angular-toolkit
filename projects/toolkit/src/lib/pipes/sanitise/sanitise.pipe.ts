/**
 * Sanitize HTML codes to normal string
 */

import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'sanitise'
})
export class SanitisePipe implements PipeTransform {

  transform(value: string): string {
    if (value === undefined || value === null) { return ''; }

    value = `${value}`;

    return value.replace(/</g, '&lt;');
  }
}
