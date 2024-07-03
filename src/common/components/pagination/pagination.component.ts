import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input({required: true}) limit!: number
  @Input({required: true}) start!: number
  @Output() startChange: EventEmitter<number> = new EventEmitter<number>()
  @Input() total: number = 0

  //page 1 (0 + 1), start 0
  //page 2 (1 + 1), start 2 (0 + limit)
  //page 3 (2 + 1), start 4 (2 + limit)

  get pages() {
    return new Array(Math.ceil(this.total / this.limit)).fill(0).map((value, index) => {
      return {
        number: index + 1,
        start: index * this.limit
      }
    });
  }
}
