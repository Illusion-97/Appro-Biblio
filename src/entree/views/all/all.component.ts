import {Component, inject} from '@angular/core';
import {map, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {Action, Displayer, TableComponent} from "../../../common/components/table/table.component";
import {Entree} from "../../models/entree";

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [
    TableComponent,
    AsyncPipe,
    TableComponent
  ],
  templateUrl: './all.component.html',
  styleUrl: './all.component.css'
})
export class AllComponent {
  visiteurs: Observable<Entree[]> = inject(ActivatedRoute).data.pipe(map(({visiteurs}) => visiteurs))
  displayers: Displayer<Entree>[] = [
    {
      header: "Visiteur",
      display: (value) => `${value.visiteur.nom.toUpperCase()} ${value.visiteur.prenom}`
    },{
      header: "Badge",
      display: (value) => value.badge.numero
    },{
      header: "Raison",
      display: (value) => value.raison.libelle
    },{
      header: "Arrivée",
      display: (value) => value.arrivee
    },{
      header: "Départ",
      display: (value) => value.sortie
    },
  ]
  actions: Action<Entree>[] = [
    {
      name: "Edit",
      link: value => 'editor/'+value.id
    }
  ]
}

