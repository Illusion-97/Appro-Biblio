import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./home/home.component").then(m => m.HomeComponent)
  },
  {
    path: "raisons",
    loadChildren: () => import("../raisons/raisons.routes").then(m => m.routes)
  },
  {
    path: "visiteurs",
    loadChildren: () => import("../visiteurs/visiteurs.routes").then(m => m.routes)
  },
  {
    path: "badges",
    loadChildren: () => import("../badges/badges.routes").then(m => m.routes)
  },
  {
    path: "entrees",
    loadChildren: () => import("../entree/entrees.routes").then(m => m.routes)
  },
  {
    path: "**",
    loadComponent: () => import("./not-found/not-found.component").then(m => m.NotFoundComponent)
  }
];
