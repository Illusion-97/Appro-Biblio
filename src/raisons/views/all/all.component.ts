import {Component, inject} from '@angular/core';
import {map, Observable} from "rxjs";
import {Raison} from "../../models/raison";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {Action, Displayer, TableComponent} from "../../../common/components/table/table.component";

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [
    AsyncPipe,
    TableComponent
  ],
  templateUrl: './all.component.html',
  styleUrl: './all.component.css'
})
export class AllComponent {
  raisons: Observable<Raison[]> = inject(ActivatedRoute).data.pipe(map(({raisons}) => raisons))
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
}
