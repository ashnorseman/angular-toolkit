/**
 * Email validator
 * @returns {ValidatorFn}
 */

import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  return (control: AbstractControl): {[key: string]: any} => {
    if (!control.value) { return null; }

    const valid = EMAIL_REGEXP.test(control.value);

    return valid ? null : { 'email': { value: control.value } };
  };
}
