import {Component, inject} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormUser, User} from "../../../common/models/user";
import {AbstractFormComponent} from "../../../common/components/abstract-form-component";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent extends AbstractFormComponent {

  form: FormGroup = new FormGroup({
    id: new FormControl(0, {
      validators: [Validators.required]
    }),
    username: new FormControl("", {
      validators: [Validators.required]
    }),
    password: new FormControl("", {
      validators: [Validators.required, Validators.minLength(6)]
    }),
    email: new FormControl("", {
      validators: [Validators.required, Validators.email]
    })
  })

  confirmPassword: FormControl = new FormControl<string>("", {
    validators: [Validators.required, this.mustMatch(this.getControl('password'))]
  })

  private service: AuthService = inject(AuthService)
  private router: Router = inject(Router)

  onSubmit$(): void {
    this.service.register(this.form.value)
      .subscribe({
        next: () => this.router.navigate(['/auth/login'])
      })
  }

  // 'override' n'est nécessaire que dans le cas ou la variable ou méthode de la classe parent n'est pas 'abstract'
  override onSubmit() {
    this.confirmPassword.markAsTouched()
    super.onSubmit();
  }
}
