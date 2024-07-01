import {Component, inject} from '@angular/core';
import {map, Observable} from "rxjs";
import {Visiteur} from "../../models/visiteur";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {Action, Displayer, TableComponent} from "../../../common/components/table/table.component";
import {Raison} from "../../../raisons/models/raison";

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
  visiteurs: Observable<Visiteur[]> = inject(ActivatedRoute).data.pipe(map(({visiteurs}) => visiteurs))
  displayers: Displayer<Visiteur>[] = [
    {
      header: "Nom",
      display: (value) => value.nom
    },{
      header: "Prenom",
      display: (value) => value.prenom
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
      display: (value) => value.depart
    },
  ]
  actions: Action<Visiteur>[] = [
    {
      name: "Edit",
      link: value => 'editor/'+value.id
    }
  ]
}

