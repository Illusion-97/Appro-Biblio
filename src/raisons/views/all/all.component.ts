import {Component, inject} from '@angular/core';
import {TableComponent} from "../../components/table/table.component";
import {map, Observable} from "rxjs";
import {Raison} from "../../models/raison";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe} from "@angular/common";

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
  raisons: Observable<Raison[]> = inject(ActivatedRoute).data.pipe(map(({raisons}) => raisons))
}
