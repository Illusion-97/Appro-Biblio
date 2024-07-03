import {Component, inject} from '@angular/core';
import {AbstractFormComponent} from "ngx-jcs-common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {catchError, map, throwError} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent extends AbstractFormComponent {
  form: FormGroup = new FormGroup<any>({
    id: new FormControl(0),
    libelle: new FormControl("", {validators: [Validators.required]})
  });

  private http = inject(HttpClient)
  private router = inject(Router)

  constructor(route: ActivatedRoute) {
    super();
    route.data
      .pipe(map(({raison}) => raison), takeUntilDestroyed())
      .subscribe(raison => {
        if (raison) this.form.patchValue(raison)
        else this.form.reset()
      })
  }

  onSubmit$(): void {
    const id = this.form.value.id;
    (id
      ? this.http.put("/raisons/" + id, this.form.value)
      : this.http.post("/raisons", this.form.value))
      .pipe(catchError(err => {
        console.log(err)
        // return of(undefined) on peut retourner une valeur utilisable dans le next et éviter une gestion d'erreur supplémentaire
        return throwError(() => err)
      }))
      .subscribe(() => this.router.navigate(['/raisons']))
  }

}
