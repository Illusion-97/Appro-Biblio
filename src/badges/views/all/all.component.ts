import {Component, inject} from '@angular/core';
import {map, Observable} from "rxjs";
import {Badge} from "../../models/badge";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {Action, Displayer, TableComponent} from "../../../common/components/table/table.component";
import {HttpClient, HttpParams} from '@angular/common/http';
import {PaginationComponent} from '../../../common/components/pagination/pagination.component';

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [
    TableComponent,
    AsyncPipe,
    PaginationComponent
  ],
  templateUrl: './all.component.html',
  styleUrl: './all.component.css'
})

export class AllComponent {
  //badges: Observable<Badge[]> = inject(ActivatedRoute).data.pipe(map(({badges}) => badges))
  displayers: Displayer<Badge>[] = [
    {
      header: "Numéro",
      display: (value) => value.numero
    },
  ]
  actions: Action<Badge>[] = [
    {
      name: "Edit",
      link: value => 'editor/' + value.id
    }
  ]
  limit: number = 2
  start: number = 0
  total: number = 0
  badges: Observable<Badge[]> = inject(ActivatedRoute).data.pipe(map(({badges}) => {
    this.total = badges.total
    return badges.body
  }))
  private http: HttpClient = inject(HttpClient)

  get page() {
    return this.start
  }

  set page(value: number) {
    this.start = value
    this.badges = this.http.get<Badge[]>("/badges", {
      params: new HttpParams()
        .append('_limit', this.limit)
        .append('_start', this.start),
      observe: "response"
    })
      .pipe(map(response => {
        this.total = +response.headers.get('X-Total-Count')!
        return response.body!
      }))
  }
}

