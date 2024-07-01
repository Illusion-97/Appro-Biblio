import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "raisons",
    loadChildren: () => import("../raisons/raisons.routes").then(m => m.routes)
  },
  {
    path: "**",
    loadComponent: () => import("./not-found/not-found.component").then(m => m.NotFoundComponent)
  }
];
