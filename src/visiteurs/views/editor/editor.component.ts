import {Component, inject} from '@angular/core';
import {AbstractFormComponent} from "ngx-jcs-common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Raison} from "../../../raisons/models/raison";
import {Badge} from "../../../badges/models/badge";
import {AsyncPipe} from "@angular/common";
import {Visiteur} from "../../models/visiteur";

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent extends AbstractFormComponent {
  form: FormGroup = new FormGroup<any>({
    id: new FormControl(0, {nonNullable: true}),
    nom: new FormControl("", {
      validators: [Validators.required],
      nonNullable: true
    }),
    prenom: new FormControl("", {
      validators: [Validators.required],
      nonNullable: true
    })
  });
  raisons: Observable<Raison[]> = inject(ActivatedRoute).data.pipe(map(({raisons}) => raisons))
  badges: Observable<Badge[]> = inject(ActivatedRoute).data.pipe(map(({badges}) => badges))

  private http = inject(HttpClient)
  private router = inject(Router)

  private entry: boolean = false

  constructor(route: ActivatedRoute) {
    super();
    route.data
      .pipe(map(({visiteur}) => visiteur), takeUntilDestroyed())
      .subscribe(visiteur => {
        if (visiteur) this.form.patchValue(visiteur)
        else this.form.reset()
      })
    route.queryParams.pipe(map(({entry}) => {
      this.entry = !!entry
    }), takeUntilDestroyed()).subscribe()
  }

  onSubmit$(): void {
    const id = this.form.value.id;
    (id
      ? this.http.put<Visiteur>("/visiteurs/" + id, this.form.value)
      : this.http.post<Visiteur>("/visiteurs", this.form.value))
      .pipe(catchError(err => {
        console.log(err)
        // return of(undefined) on peut retourner une valeur utilisable dans le next et éviter une gestion d'erreur supplémentaire
        return throwError(() => err)
      }))
      .subscribe(result => {
        if (this.entry)
          this.router.navigate(['/entrees/editor/0'], {state: {visiteur: result}})
        else
          this.router.navigate(['/visiteurs'])
      })
  }
}
