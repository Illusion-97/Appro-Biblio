import {Component, inject} from '@angular/core';
import {map, Observable, switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {Entree} from "../../models/entree";
import {TableComponent} from "../../component/table/table.component";

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [
    TableComponent,
    AsyncPipe,
  ],
  templateUrl: './all.component.html',
  styleUrl: './all.component.css'
})
export class AllComponent {
  entrees: Observable<Entree[]> = inject(ActivatedRoute).data.pipe(map(({entrees}) => entrees))
}

