import {ActivatedRouteSnapshot, Router, Routes} from "@angular/router";
import {inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, of} from "rxjs";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./views/all/all.component").then(m => m.AllComponent),
    resolve: {
      raisons: () => inject(HttpClient).get("/raisons")
    }
  },
  {
    path: "editor/:id",
    loadComponent: () => import("./views/editor/editor.component").then(m => m.EditorComponent),
    resolve: {
      raison: (route: ActivatedRouteSnapshot) => {
        const id = +route.params['id']
        const router = inject(Router)
        return id ? inject(HttpClient).get("/raisons/" + id)
            .pipe(catchError(() => {
              // on ne fait pas d'injection dans un subscribe ni un pipe
              router.navigate(['/raisons/editor/0']).then(() => alert("Raison inexistante"))
              return of(undefined)
            }))
          : undefined
      }
    }
  }
]
