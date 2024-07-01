import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Visiteur} from "../../models/visiteur";

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
  @Input({required: true}) visiteurs!: Visiteur[]
}
