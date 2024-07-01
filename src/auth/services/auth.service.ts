import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Credentials} from "../views/login/login.component";
import {User} from "../../common/models/user";
import {BehaviorSubject, first, tap} from "rxjs";
import {CanActivateFn, Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http: HttpClient = inject(HttpClient)
  //Un BehaviorSubject est un type d'Observable contenant une valeur initiale (ou la dernière valeur émise)
  private currentResponse: BehaviorSubject<AuthResponse | null> = new BehaviorSubject<AuthResponse | null>(null)

  get isLogged(): boolean {
    return !!this.currentResponse.value
  }

  get currentUser(): User | undefined {
    return this.currentResponse.value?.user
  }

  get token(): string | undefined {
    return this.currentResponse.value?.accessToken
  }

  useLocal: boolean = false

  constructor() {
    const auth = sessionStorage.getItem("AUTH") ?? localStorage.getItem("AUTH")
    if(auth) this.currentResponse.next(JSON.parse(auth))
  }

  //POST http://localhost:3000/login
  login(credentials: Credentials) {
    return this.http.post<AuthResponse>(`/login`,credentials)
      .pipe(first(), tap(response => {
        this.currentResponse.next(response);
        (this.useLocal ? localStorage : sessionStorage).setItem("AUTH", JSON.stringify(response))
      }))
  }

  //POST http://localhost:3000/register
  register(user: User) {
    return this.http.post<AuthResponse>(`/register`,user)
  }

  private router: Router = inject(Router)

  logout() {
    this.currentResponse.next(null)
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigate(['/home'])
  }
}

export interface AuthResponse {accessToken: string, user: User}

export const authGuard : CanActivateFn = route =>
  inject(AuthService).isLogged ||
  inject(Router).createUrlTree(['/auth/login'])
