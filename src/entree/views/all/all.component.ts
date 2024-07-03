import {Component, inject} from '@angular/core';
import {first, map, Observable, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe, DatePipe} from "@angular/common";
import {Action, Displayer, TableComponent} from "../../../common/components/table/table.component";
import {Entree} from "../../models/entree";
import {HttpClient, HttpParams} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {PaginationComponent} from "../../../common/components/pagination/pagination.component";
import {getPage, Page} from "ngx-jcs-common";

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [
    TableComponent,
    AsyncPipe,
    TableComponent,
    FormsModule,
    PaginationComponent
  ],
  templateUrl: './all.component.html',
  styleUrl: './all.component.css'
})
export class AllComponent {
  entrees: Observable<Page<Entree>>;
  visiteur: string = ""
  badge: string = ""
  sortie?: boolean
  limit: number = 2
  start: number = 0
  total: number = 0
  private http: HttpClient = inject(HttpClient)
  actions: Action<Entree>[] = [
    {
      name: "Edit",
      link: value => 'editor/' + value.id
    },
    {
      name: "Rendre le badge",
      show: value => !value.sortie,
      method: value => {
        value.sortie = new Date()
        value.visiteur = undefined
        this.http.put("/entrees/" + value.id, value).pipe(first())
          .subscribe(() => this.entrees = getPage(this.http, "/entrees"))
      }
    }
  ]
  private datePipe = new DatePipe("en-US")
  displayers: Displayer<Entree>[] = [
    {
      header: "Visiteur",
      display: (value) => value.visiteur
        ? `${value.visiteur.nom.toUpperCase()} ${value.visiteur.prenom}`
        : "Visiteur Anonyme"
    }, {
      header: "Badge",
      display: (value) => value.badge.numero
    }, {
      header: "Raison",
      display: (value) => value.raison.libelle
    }, {
      header: "Arrivée",
      display: (value) => this.datePipe.transform(value.arrivee, "short")
    }, {
      header: "Départ",
      display: (value) => this.datePipe.transform(value.sortie, "short")
    },
  ]

  constructor(route: ActivatedRoute) {
    this.entrees = route.data.pipe(map(({entrees}) => entrees))
    route.queryParams.pipe(takeUntilDestroyed(), map(({sortie}) => sortie)).subscribe(sortie => {
      this.sortie = sortie ? JSON.parse(sortie) : undefined
      this.getFiltered()
    })
  }

  get page() {
    return this.start
  }

  set page(value: number) {
    this.start = value
    this.getFiltered()
  }

  getFiltered() {
    let params = new HttpParams().append('_limit', this.limit).append('_start', this.start)
    if (this.visiteur) params = params.append("visiteur.nom_like", this.visiteur)
    if (this.badge) params = params.append("badge.numero_like", this.badge)
    this.entrees = getPage<Entree>(this.http, "/entrees", params).pipe(map(results => {
        if(this.sortie !== undefined)
          results.body = results.body.filter(result => this.sortie ? !!result.sortie : !result.sortie)
        return results
      }))
  }
}

