import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgTemplateOutlet} from "@angular/common";
import {PaginationComponent} from "../pagination/pagination.component";
import {getPage, Page} from "ngx-jcs-common";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    RouterLink,
    NgTemplateOutlet,
    PaginationComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent<T> {
  @Input({required: true}) datas!: T[] | Page<T>
  @Input({required: true}) displayers!: Displayer<T>[]
  @Input() actions?: Action<T>[]
  @Input() limit: number = 0
  @Input() start: number = 0
  @Output() startChange: EventEmitter<number> = new EventEmitter<number>()

  get page() {
    return this.start
  }

  set page(value: number) {
    this.start = value
    this.startChange.emit(this.start)
  }

  get total() {
    return (this.datas as any).total || 0
  }

  get array() {
    return (this.datas as any).body
      ? (this.datas as any).body
      : this.datas as T[]
  }

  get isArray() {
    return !(this.datas as any).body
  }

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
  show?: (value: T) => boolean
  link?: (value: T) => string | any[]
  method?: (value: T) => void
}
