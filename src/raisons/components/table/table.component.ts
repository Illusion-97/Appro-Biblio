import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Raison} from "../../models/raison";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input({required: true}) raisons!: Raison[]
}
