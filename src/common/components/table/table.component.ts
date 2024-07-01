import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent<T> {
  @Input({required: true}) datas! : T[]
  @Input({required: true}) displayers! : Displayer<T>[]
  @Input() actions? : Action<T>[]

  protected get displayers$() {
    return this.displayers.map(({display}) => display)
  }
  protected get headers() {
    return this.displayers.map(({header}) => header)
  }

}

export interface Displayer<T> {
  header: string
  display: (value: T) => any
}
export interface Action<T> {
  name: string
  link: (value: T) => string | any[]
}
