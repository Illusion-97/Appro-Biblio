import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {first, map, Observable, switchMap} from "rxjs";
import {Visiteur} from "../../models/visiteur";
import {getPage, Page} from "ngx-jcs-common"
import {Entree} from "../../../entree/models/entree";
import {CardComponent} from "../../../common/components/card/card.component";
import {Action, Displayer, TableComponent} from "../../../common/components/table/table.component";
import {AsyncPipe, DatePipe, TitleCasePipe} from "@angular/common";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {HttpClient, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CardComponent,
    TableComponent,
    AsyncPipe
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  entrees: Observable<Page<Entree>>
  visiteur!: Visiteur
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
        this.entrees = this.http.put<Entree>("/entrees/" + value.id, value).pipe(
          first(),
          switchMap(() => entreeByVisiteurId(this.http, this.visiteur.id)))
      }
    }
  ]
  limit: number = 2
  start: number = 0
  private datePipe = new DatePipe("en-US")
  displayers: Displayer<Entree>[] = [
    {
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

  constructor(route: ActivatedRoute, private http: HttpClient) {
    route.data.pipe(takeUntilDestroyed()).subscribe(({visiteur}) => this.visiteur = visiteur)
    this.entrees = route.data.pipe(map(({entrees}) => entrees))
  }

  get username() {
    return `${this.visiteur.nom.toUpperCase()} ${new TitleCasePipe().transform(this.visiteur.prenom)}`
  }

  get page() {
    return this.start
  }

  set page(value: number) {
    this.start = value
    this.entrees = entreeByVisiteurId(this.http, this.visiteur.id, new HttpParams()
      .append('_limit', this.limit)
      .append('_start', this.start))
  }
}

export const entreeByVisiteurId = (http: HttpClient, id: string | number, params?: HttpParams) => getPage<Entree>(http, "/entrees?visiteur.id=" + id, params)
