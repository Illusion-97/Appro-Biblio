import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = ""
  password: string = ""

  get credentials(): Credentials {
    return {
      email: this.email,
      password: this.password
    }
  }

  set credentials(value) {
    this.email = value.email
    this.password = value.password
  }


  protected service: AuthService = inject(AuthService)
  private router: Router = inject(Router)

  login(form: HTMLFormElement) {
    if(form.checkValidity())
      this.service.login(this.credentials).subscribe(response => {
        this.router.navigate(['/home'])
      })
  }

  get jsonValue() {
    return JSON.stringify(this.credentials)
  }
}

export interface Credentials {
  email: string;
  password: string;
}
