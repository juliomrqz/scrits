import { FormControl } from '@angular/forms';

export function validateSlug(control: FormControl) {
  const EMAIL_REGEXP = new RegExp(/^[-a-zA-Z0-9_]+$/);

  return EMAIL_REGEXP.test(control.value) ? null : {
    slug: {
      valid: false
    }
  };
}
