import {Component, inject} from '@angular/core';
import {AbstractFormComponent} from "../../../common/components/abstract-form-component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, throwError} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Raison} from "../../../raisons/models/raison";
import {Badge} from "../../../badges/models/badge";
import {AsyncPipe, TitleCasePipe, UpperCasePipe} from "@angular/common";
import {Entree} from "../../models/entree";
import {Visiteur} from "../../../visiteurs/models/visiteur";

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    UpperCasePipe,
    TitleCasePipe
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent extends AbstractFormComponent {
  form: FormGroup = new FormGroup<any>({
    id: new FormControl(0, {nonNullable: true}),
    visiteur: new FormGroup({
      id: new FormControl(0)
    }, {validators: [Validators.required]}),
    badge: new FormGroup({
      id: new FormControl(0)
    }, {validators: [Validators.required]}),
    raison: new FormGroup({
      id: new FormControl(0)
    }, {validators: [Validators.required]}),
    arrivee: new FormControl(new Date(), {
      validators: [Validators.required],
      nonNullable: true
    }),
    sortie: new FormControl(null, {nonNullable: true})
  });
  raisons: Observable<Raison[]> = inject(ActivatedRoute).data.pipe(map(({raisons}) => raisons))
  badges: Observable<Badge[]> = inject(ActivatedRoute).data.pipe(map(({badges}) => badges))
  visiteurs: Observable<Visiteur[]> = inject(ActivatedRoute).data.pipe(map(({visiteurs}) => visiteurs))

  private http = inject(HttpClient)
  private router = inject(Router)

  constructor(route: ActivatedRoute) {
    super();
    route.data
      .pipe(map(({entree}) => entree), takeUntilDestroyed())
      .subscribe(entree => {
        if(entree) this.form.patchValue(entree)
        else this.form.reset()
      })
  }

  onSubmit$(): void {
    const id = this.form.value.id;
    (id
      ? this.http.put("/entrees/"+id, this.form.value)
      : this.http.post("/entrees", this.form.value))
      .pipe(catchError( err => {
        console.log(err)
        // return of(undefined) on peut retourner une valeur utilisable dans le next et éviter une gestion d'erreur supplémentaire
        return throwError(() => err)
      }))
      .subscribe(() => this.router.navigate(['/entrees']))
  }
}
