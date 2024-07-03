import {ActivatedRouteSnapshot, Router, Routes} from "@angular/router";
import {inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, of} from "rxjs";
import {getPage} from "../common/tools/http.tools";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./views/all/all.component").then(m => m.AllComponent),
    resolve: {
      visiteurs: () => getPage(inject(HttpClient), "/visiteurs")
    }
  },
  {
    path: "editor/:id",
    loadComponent: () => import("./views/editor/editor.component").then(m => m.EditorComponent),
    resolve: {
      visiteur: (route: ActivatedRouteSnapshot) => {
        const id = +route.params['id']
        const router = inject(Router)
        return id ? inject(HttpClient).get("/visiteurs/" + id)
            .pipe(catchError(() => {
              // on ne fait pas d'injection dans un subscribe ni un pipe
              router.navigate(['/visiteurs/editor/0']).then(() => alert("Visiteur inexistant"))
              return of(undefined)
            }))
          : undefined
      },
      raisons: () => inject(HttpClient).get("/raisons"),
      badges: () => inject(HttpClient).get("/badges")
    }
  },
  {
    path: "detail/:id",
    loadComponent: () => import("./views/detail/detail.component").then(m => m.DetailComponent),
    resolve: {
      visiteur: (route: ActivatedRouteSnapshot) => {
        const id = +route.params['id']
        const router = inject(Router)
        return id ? inject(HttpClient).get("/visiteurs/" + id)
            .pipe(catchError(() => {
              // on ne fait pas d'injection dans un subscribe ni un pipe
              router.navigate(['/visiteurs/editor/0']).then(() => alert("Visiteur inexistant"))
              return of(undefined)
            }))
          : undefined
      },
      entrees: (route: ActivatedRouteSnapshot) => {
        const id = +route.params['id']
        return inject(HttpClient).get("/entrees?visiteur.id=" + id)
      }
    }
  }
]
