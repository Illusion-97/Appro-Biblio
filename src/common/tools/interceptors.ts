import {HttpInterceptorFn} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {finalize} from "rxjs";
import {AuthService} from "../../auth/services/auth.service";
import {inject} from "@angular/core";

export const backendInterceptor: HttpInterceptorFn = (request, next) => {
  console.log("backend")
  const url = request.url
  if(url.startsWith('/'))
    // Remplacer la requête devant partir, par un clone avec des mises à jour
    request = request.clone({
      url: environment.API_URL + url
    })
  return next(request)
}

export const cursorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("cursor")
  document.body.classList.add('pending')
  //pipe(finalise('function') permet de décrire un comportement à réaliser à la reception d'une information
  return next(req).pipe(finalize(() => document.body.classList.remove('pending')))
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("token")
  const token = inject(AuthService).token
  if(token && req.url.startsWith(environment.API_URL))
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  return next(req)
}
