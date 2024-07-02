import {Component, inject} from '@angular/core';
import {map, Observable} from "rxjs";
import {Visiteur} from "../../models/visiteur";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {Action, Displayer, TableComponent} from "../../../common/components/table/table.component";
import {Raison} from "../../../raisons/models/raison";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Badge} from "../../../badges/models/badge";
import {PaginationComponent} from "../../../common/components/pagination/pagination.component";
import {getPage, Page} from "../../../common/tools/http.tools";

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [
    TableComponent,
    AsyncPipe,
    TableComponent,
    PaginationComponent
  ],
  templateUrl: './all.component.html',
  styleUrl: './all.component.css'
})
export class AllComponent {
  visiteurs: Observable<Page<Visiteur>> = inject(ActivatedRoute).data.pipe(map(({visiteurs}) => visiteurs))
  displayers: Displayer<Visiteur>[] = [
    {
      header: "Nom",
      display: (value) => value.nom
    },{
      header: "Prenom",
      display: (value) => value.prenom
    }
  ]
  actions: Action<Visiteur>[] = [
    {
      name: "Edit",
      link: value => 'editor/'+value.id
    }
  ]
  private http: HttpClient = inject(HttpClient)
  limit: number = 2
  start: number = 0

  get page() {
    return this.start
  }

  set page(value: number) {
    this.start = value
    this.visiteurs = getPage(this.http, "/visiteurs",new HttpParams()
      .append('_limit', this.limit)
      .append('_start', this.start))
  }
}

