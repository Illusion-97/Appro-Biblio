import {Routes} from '@angular/router';
import {authGuard} from "../auth/services/auth.service";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./home/home.component").then(m => m.HomeComponent)
  },
  {
    path: "raisons",
    loadChildren: () => import("../raisons/raisons.routes").then(m => m.routes),
    canMatch: [authGuard]
  },
  {
    path: "visiteurs",
    loadChildren: () => import("../visiteurs/visiteurs.routes").then(m => m.routes),
    canMatch: [authGuard]
  },
  {
    path: "badges",
    loadChildren: () => import("../badges/badges.routes").then(m => m.routes),
    canMatch: [authGuard]
  },
  {
    path: "entrees",
    loadChildren: () => import("../entree/entrees.routes").then(m => m.routes)
  },
  {
    path: "auth",
    loadChildren: () => import("../auth/auth.routes").then(m => m.routes)
  },
  {
    path: "**",
    loadComponent: () => import("./not-found/not-found.component").then(m => m.NotFoundComponent)
  }
];
