import {Component, inject} from '@angular/core';
import {map, Observable} from "rxjs";
import {Badge} from "../../models/badge";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {Action, Displayer, TableComponent} from "../../../common/components/table/table.component";

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [
    TableComponent,
    AsyncPipe
  ],
  templateUrl: './all.component.html',
  styleUrl: './all.component.css'
})
export class AllComponent {
  badges: Observable<Badge[]> = inject(ActivatedRoute).data.pipe(map(({badges}) => badges))
  displayers: Displayer<Badge>[] = [
    {
      header: "Numéro",
      display: (value) => value.numero
    },
  ]
  actions: Action<Badge>[] = [
    {
      name: "Edit",
      link: value => 'editor/'+value.id
    }
  ]
}

