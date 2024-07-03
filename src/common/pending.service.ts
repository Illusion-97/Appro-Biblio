import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PendingService {

  pending: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor() {
    this.pending.subscribe(value => {
      if (value) document.body.classList.add('pending')
      else document.body.classList.remove('pending')
    })
  }
}
