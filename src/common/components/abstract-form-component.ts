import {User} from "../models/user";
import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export abstract class AbstractFormComponent {

  abstract form: FormGroup

  onSubmit() {
    this.form.markAllAsTouched()
    if(this.form.valid) this.onSubmit$()
  }

  abstract onSubmit$(): void
  get jsonValue() {
    return JSON.stringify(this.form.value)
  }

  getControl(control: AbstractControl | string) {
    if (typeof control == "string") {
      const found = this.form.get(control)
      if (!found) throw new Error("Control introuvable")
      return found
    }
    return control
  }

  isInvalid(control: AbstractControl | string) {
    control = this.getControl(control)
    return (control.touched || control.dirty) && control.invalid
  }

  hasError(name: AbstractControl | string, errorCode: string) {
    const control = this.getControl(name)
    return (control.touched || control.dirty) && control.hasError(errorCode)
  }

  mustMatch(matchingControl: AbstractControl): ValidatorFn {
    return (control): ValidationErrors | null => {
      return control.value === matchingControl.value
        ? null
        : { // Objet de type ValidationErrors
        mustmatch: "Ne match pas" // errorCode : value
      }
    }
  }
}
