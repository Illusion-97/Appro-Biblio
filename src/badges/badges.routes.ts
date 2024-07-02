import {ActivatedRouteSnapshot, Router, Routes} from "@angular/router";
import {inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, map, of} from "rxjs";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./views/all/all.component").then(m => m.AllComponent),
    resolve: {
      badges: () => inject(HttpClient).get("/badges?_limit=3", {observe: "response"})
        .pipe(map(response => {
          return {
            total: +response.headers.get('X-Total-Count')!,
            body: response.body!
          }
        }))
    }
  },
  {
    path: "editor/:id",
    loadComponent: () => import("./views/editor/editor.component").then(m => m.EditorComponent),
    resolve: {
      badge: (route: ActivatedRouteSnapshot) => {
        const id = +route.params['id']
        const router = inject(Router)
        return id ? inject(HttpClient).get("/badges/" + id)
            .pipe(catchError(() => {
              // on ne fait pas d'injection dans un subscribe ni un pipe
              router.navigate(['/badges/editor/0']).then(() => alert("Badge inexistant"))
              return of(undefined)
            }))
          : undefined
      }
    }
  }
]
