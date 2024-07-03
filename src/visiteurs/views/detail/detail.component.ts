import { Component, inject } from '@angular/core';
import { Visiteur } from '../../models/visiteur';
import { Observable, first, map } from 'rxjs';
import { Page } from '../../../common/tools/http.tools';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Entree } from '../../../entree/models/entree';
import { Action, Displayer, TableComponent } from "../../../common/components/table/table.component";
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-detail',
    standalone: true,
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.css',
    imports: [TableComponent]
})
export class DetailComponent {
  visiteur!: Visiteur
  entrees!: Entree[]
  datePipe: DatePipe = new DatePipe("en-US")
  
  constructor(route: ActivatedRoute, private http: HttpClient) {
    route.data
      .pipe(takeUntilDestroyed())
      .subscribe(({visiteur, entrees}) => {
        this.visiteur = visiteur
        this.entrees = entrees
      })
  }

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

  actions: Action<Entree>[] = [
    {
      name: "Rendre le badge",
      show: value => !value.sortie,
      method: value => {
        value.sortie = new Date()
        value.visiteur = undefined
        this.http.put("/entrees/" + value.id, value).pipe(first())
          .subscribe( () => this.http.get<Entree[]>("/entrees?visiteur.id=" + this.visiteur.id).subscribe(response => this.entrees = response)
      )}
    }
  ]  
}
