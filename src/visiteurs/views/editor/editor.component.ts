import {Component, inject} from '@angular/core';
import {AbstractFormComponent} from "../../../common/components/abstract-form-component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {catchError, map, of, throwError} from "rxjs";
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
    nom: new FormControl("", {validators: [Validators.required]}),
    prenom: new FormControl("", {validators: [Validators.required]}),
    badge: new FormControl("", {validators: [Validators.required]}),
    raison: new FormControl("", {validators: [Validators.required]}),
    arrivee: new FormControl(new Date(), {validators: [Validators.required]}),
    depart: new FormControl("")
  });

  private http = inject(HttpClient)
  private router = inject(Router)

  constructor(route: ActivatedRoute) {
    super();
    route.data
      .pipe(map(({visiteur}) => visiteur), takeUntilDestroyed())
      .subscribe(visiteur => {
        console.log("visiteur ", visiteur)
        if(visiteur) this.form.patchValue(visiteur)
        else this.form.reset()
      })
  }

  onSubmit$(): void {
    const id = this.form.value.id;
    (id
      ? this.http.put("/visiteurs/"+id, this.form.value)
      : this.http.post("/visiteurs", this.form.value))
      .pipe(catchError( err => {
        console.log(err)
        // return of(undefined) on peut retourner une valeur utilisable dans le next et éviter une gestion d'erreur supplémentaire
        return throwError(() => err)
      }))
      .subscribe(() => this.router.navigate(['/visiteurs']))
  }
}
