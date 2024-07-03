import {HttpInterceptorFn} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {finalize} from "rxjs";
import {AuthService} from "../../auth/services/auth.service";
import {inject} from "@angular/core";
import {PendingService} from "../pending.service";

export const backendInterceptor: HttpInterceptorFn = (request, next) => {
  const url = request.url
  if (url.startsWith('/'))
    // Remplacer la requête devant partir, par un clone avec des mises à jour
    request = request.clone({
      url: environment.API_URL + url
    })
  return next(request)
}

export const pendingInterceptor: HttpInterceptorFn = (req, next) => {
  const service = inject(PendingService)
  service.pending.next(true)
  return next(req).pipe(finalize(() => service.pending.next(false)))
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token
  if (token && req.url.startsWith(environment.API_URL))
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  return next(req)
}
