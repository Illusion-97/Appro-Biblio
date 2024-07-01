import {Component, inject, Input, OnInit} from '@angular/core';
import {Entree} from "../../../models/entree";
import {Visiteur} from "../../../../visiteurs/models/visiteur";
import {first, forkJoin} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Badge} from "../../../../badges/models/badge";
import {Raison} from "../../../../raisons/models/raison";
import {DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-row',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './row.component.html',
  styleUrl: './row.component.css'
})
export class RowComponent implements OnInit {
  @Input({required: true}) entree!: Entree;
  visiteur?: Visiteur
  badge?: Badge
  raison?: Raison

  private http = inject(HttpClient)
  ngOnInit() {
    forkJoin([this.http.get<Visiteur>("/visiteurs/"+this.entree.visiteur.id).pipe(first()),
    this.http.get<Badge>("/badges/"+this.entree.badge.id).pipe(first()),
    this.http.get<Raison>("/raisons/"+this.entree.raison.id).pipe(first())])
      .subscribe(results => {
        this.visiteur = results[0]
        this.badge = results[1]
        this.raison = results[2]
      })
  }
}
