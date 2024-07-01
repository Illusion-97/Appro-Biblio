import {Component, inject, Input} from '@angular/core';
import {Entree} from "../../models/entree";
import {first, Observable} from "rxjs";
import {Visiteur} from "../../../visiteurs/models/visiteur";
import {HttpClient} from "@angular/common/http";
import {Badge} from "../../../badges/models/badge";
import {Raison} from "../../../raisons/models/raison";
import {RouterLink} from "@angular/router";
import {AsyncPipe, DatePipe} from "@angular/common";
import {RowComponent} from "./row/row.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    DatePipe,
    RowComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input({required: true}) entrees!: Entree[]

}
