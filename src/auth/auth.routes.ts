import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: "login",
    loadComponent: () => import("./views/login/login.component").then(m => m.LoginComponent)
  },
  {
    path: "register",
    loadComponent: () => import("../auth/views/register/register.component").then(m => m.RegisterComponent)
  }
]
