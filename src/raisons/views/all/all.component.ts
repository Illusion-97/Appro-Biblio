import {Component, inject} from '@angular/core';
import {map, Observable} from "rxjs";
import {Raison} from "../../models/raison";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {Action, Displayer, TableComponent} from "../../../common/components/table/table.component";
import {PaginationComponent} from "../../../common/components/pagination/pagination.component";
import {Entree} from "../../../entree/models/entree";
import {HttpClient, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [
    AsyncPipe,
    TableComponent,
    PaginationComponent
  ],
  templateUrl: './all.component.html',
  styleUrl: './all.component.css'
})
export class AllComponent {
  displayers: Displayer<Raison>[] = [
    {
      header: "Libelle",
      display: (value) => value.libelle
    }
  ]
  actions: Action<Raison>[] = [
    {
      name: "Edit",
      link: value => 'editor/'+value.id
    }
  ]


  private http: HttpClient = inject(HttpClient)
  limit: number = 2
  start: number = 0
  total: number = 0
  raisons: Observable<Raison[]> = inject(ActivatedRoute).data.pipe(map(({raisons}) => {
    this.total = raisons.total
    return raisons.body
  }))

  get page() {
    return this.start
  }

  set page(value: number) {
    this.start = value
    this.raisons = this.http.get<Raison[]>("/raisons", {
      params: new HttpParams()
        .append('_limit', this.limit)
        .append('_start', this.start),
      observe: "response"})
      .pipe(map(response => {
        this.total = +response.headers.get('X-Total-Count')!
        return response.body!
      }))
  }
}
