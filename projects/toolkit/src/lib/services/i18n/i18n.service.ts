/**
 * i18n translation service
 * WARNING: Use curly quotations instead of quotation mark!!!
 * e.g. i18n.trans('“Philips Lighting” app')
 */

import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class I18nService {

  constructor() { }

  /**
   * Translate a string with variables
   * e.g.
   * - 'Delete luminaires' -> 'Delete luminaires'
   * - 'Delete luminaire $1', 'Lum_01' -> 'Delete luminaire Lum_01'
   * - 'Delete luminaire $1 in project $2', 'Lum_01', 'Project_02' -> 'Delete luminaire Lum_01 in project Project_02'
   */
  trans(str: string, ...args: any[]): string {
    if (!str) { return ''; }

    if (!args.length) { return str; }

    // insert variables
    args.forEach((arg: any, i: number) => {
      const reg = new RegExp(`\\$${i + 1}`);

      str = str.replace(reg, arg);
    });

    return str;
  }
}
