import { AbstractControl, ValidatorFn } from "@angular/forms";

export class CustomValidation {
  static ratingRange(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if ((c.value !== null && (isNaN(c.value)) || c.value < min || c.value > max)) {
        return { 'range': true };
      }
      return null;
    }
  }
  static emailMatch(c: AbstractControl): { [key: string]: boolean } | null {
    const email = c.get('email');
    const confirmEmail = c.get('confirmEmail');

    if (email.pristine || confirmEmail.pristine)
      return null;
    if (email.value === confirmEmail.value) {
      return null;
    }
    return { 'match': true };
  }
}