/**
 * i18n translation service
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  /**
   * Translate a string with variables
   * e.g.
   * - 'Delete luminaires' -> 'Delete luminaires'
   * - 'Delete luminaire $1', 'Lum_01' -> 'Delete luminaire Lum_01'
   * - 'Delete luminaire $1 in project $2', 'Lum_01', 'Project_02' -> 'Delete luminaire Lum_01 in project Project_02'
   * - 'Delete $1 [$1|luminaire|luminaires]', 20 -> 'Delete 20 luminaires'
   * - '{tou}Terms of use' -> 'Terms of use' (tou) is the name of project
   */
  trans(str: string, ...args: any[]): string {
    if (!str) { return ''; }

    str = str.replace(/^{[^}]+}/, '');

    if (!args.length) { return str; }

    // insert variables
    args.forEach((arg: any, i: number) => {
      const index = i + 1;

      // Replace plural strings
      const pluralReg = new RegExp(`\\[\\$${index}\\|([^|]+)\\|([^|]+)]`);
      const pluralMatch = str.match(pluralReg);

      if (pluralMatch) {
        str = str.replace(pluralReg, arg === 1 ? pluralMatch[1] : pluralMatch[2]);
      }

      // Replace with value
      const reg = new RegExp(`\\$${index}`);

      str = str.replace(reg, arg);
    });

    return str;
  }
}
