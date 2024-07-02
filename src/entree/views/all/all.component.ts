import {Component, inject} from '@angular/core';
import {first, map, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe, DatePipe} from "@angular/common";
import {Action, Displayer, TableComponent} from "../../../common/components/table/table.component";
import {Entree} from "../../models/entree";
import {HttpClient, HttpParams} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {PaginationComponent} from "../../../common/components/pagination/pagination.component";

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
  private http: HttpClient = inject(HttpClient)
  entrees: Observable<Entree[]>;
  private datePipe = new DatePipe("en-US")
  displayers: Displayer<Entree>[] = [
    {
      header: "Visiteur",
      display: (value) => value.visiteur
        ? `${value.visiteur.nom.toUpperCase()} ${value.visiteur.prenom}`
        : "Visiteur Anonyme"
    },{
      header: "Badge",
      display: (value) => value.badge.numero
    },{
      header: "Raison",
      display: (value) => value.raison.libelle
    },{
      header: "Arrivée",
      display: (value) => this.datePipe.transform(value.arrivee, "short")
    },{
      header: "Départ",
      display: (value) => this.datePipe.transform(value.sortie, "short")
    },
  ]
  actions: Action<Entree>[] = [
    {
      name: "Edit",
      link: value => 'editor/'+value.id
    },
    {
      name: "Rendre le badge",
      show: value => !value.sortie,
      method: value => {
        value.sortie = new Date()
        value.visiteur = undefined
        this.http.put("/entrees/"+value.id, value).pipe(first())
          .subscribe(() => this.entrees = this.http.get<Entree[]>("/entrees"))
      }
    }
  ]

  visiteur: string = ""
  badge: string = ""
  sortie?: boolean
  limit: number = 2
  start: number = 0
  total: number = 0

  get page() {
    return this.start
  }

  set page(value: number) {
    this.start = value
    this.getFiltered()
  }

  getFiltered() {
    let params = new HttpParams().append('_limit', this.limit).append('_start', this.start)
    if(this.visiteur) params = params.append("visiteur.nom_like", this.visiteur)
    if(this.badge) params = params.append("badge.numero_like", this.badge)
    const observable = this.http.get<Entree[]>("/entrees", {params: params, observe: "response"})
      .pipe(map(response => {
        this.total = +response.headers.get('X-Total-Count')!
        return response.body!
      }))
    this.entrees = this.sortie === undefined ? observable
    : observable.pipe(map(results => results.filter(result => this.sortie ? !!result.sortie : !result.sortie)))
  }

  constructor(route: ActivatedRoute) {
    this.entrees = route.data.pipe(map(({entrees}) => {
      this.total = entrees.total
      return entrees.body
    }))
    route.queryParams.pipe(takeUntilDestroyed(), map(({sortie}) => sortie)).subscribe(sortie => {
      this.sortie = sortie ? JSON.parse(sortie) : undefined
      this.getFiltered()
    })
  }


}

