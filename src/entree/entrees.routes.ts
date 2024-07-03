import {ActivatedRouteSnapshot, Router, Routes} from "@angular/router";
import {inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, of} from "rxjs";
import {getPage} from "../common/tools/http.tools";

export const routes: Routes = [
  {
    path: "editor/:id",
    loadComponent: () => import("./views/editor/editor.component").then(m => m.EditorComponent),
    resolve: {
      entree: (route: ActivatedRouteSnapshot) => {
        const id = +route.params['id']
        const router = inject(Router)
        return id ? inject(HttpClient).get("/entrees/" + id)
            .pipe(catchError(() => {
              // on ne fait pas d'injection dans un subscribe ni un pipe
              router.navigate(['/entrees/editor/0']).then(() => alert("Entrée inexistante"))
              return of(undefined)
            }))
          : undefined
      },
      raisons: () => inject(HttpClient).get("/raisons"),
      badges: () => inject(HttpClient).get("/badges"),
      visiteurs: () => inject(HttpClient).get("/visiteurs")
    }
  },
  {
    path: "",
    loadComponent: () => import("./views/all/all.component").then(m => m.AllComponent),
    resolve: {
      entrees: () => getPage(inject(HttpClient), "/entrees")
    }
  }
]
