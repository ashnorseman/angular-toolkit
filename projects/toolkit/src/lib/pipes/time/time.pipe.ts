/**
 * Time pipe
 */

import { Pipe, PipeTransform } from '@angular/core';
import * as moment_ from 'moment';

const moment = moment_;

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  /**
   * Use localized time display
   * @param value (any format: string, timestamp, Date, etc...)
   * @param args - format: 'date' (default) or 'full' (date & time)
   */
  transform(value: any, args: 'date' | 'full' = 'date'): string {
    if (!value) { return ''; }

    const date = moment(value).toDate().toLocaleDateString();

    return args === 'full'
      ? date + ' ' + moment(value).toDate().toLocaleTimeString()
      : date;
  }
}
