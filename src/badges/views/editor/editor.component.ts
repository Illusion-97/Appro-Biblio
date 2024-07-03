import {Component, inject} from '@angular/core';
import {AbstractFormComponent} from "ngx-jcs-common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {catchError, map, throwError} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {HotToastService} from "@ngneat/hot-toast";
import {Badge} from "../../models/badge";

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
    numero: new FormControl("", {validators: [Validators.required]})
  });

  private http = inject(HttpClient)
  private router = inject(Router)

  constructor(route: ActivatedRoute, private toast: HotToastService) {
    super();
    route.data
      .pipe(map(({badge}) => badge), takeUntilDestroyed())
      .subscribe(badge => {
        if (badge) this.form.patchValue(badge)
        else this.form.reset()
      })
  }

  onSubmit$(): void {
    const id = this.form.value.id;
    (id
      ? this.http.put<Badge>("/badges/" + id, this.form.value)
      : this.http.post<Badge>("/badges", this.form.value))
      .pipe(catchError(err => {
        console.log(err)
        // return of(undefined) on peut retourner une valeur utilisable dans le next et éviter une gestion d'erreur supplémentaire
        return throwError(() => err)
      }))
      .pipe(this.toast.observe({
        success: `Badge sauvegardé`,
        error: "Erreur à la sauvegarde du badge",
        loading: "Sauvegarde en cours veuillez patienter."
      }))
      .subscribe(() => this.router.navigate(['/badges']))
  }
}
