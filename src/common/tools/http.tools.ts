import {map, Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

export function getPage<T>(http: HttpClient, url: string, params?: HttpParams): Observable<Page<T>> {
  if (!params) params = new HttpParams().append('_limit', 2)
  return http.get<T[]>(url, {observe: "response", params: params})
    .pipe(map(response => {
      return {
        total: +response.headers.get('X-Total-Count')!,
        body: response.body!
      }
    }))
}

export interface Page<T> {
  total: number
  body: T[]
}
