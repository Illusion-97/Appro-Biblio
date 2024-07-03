import {Component, inject} from '@angular/core';
import {PendingService} from "../../pending.service";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationSkipped,
  NavigationStart,
  Router
} from "@angular/router";

@Component({
  selector: 'app-waiter',
  standalone: true,
  imports: [],
  templateUrl: './waiter.component.html',
  styleUrl: './waiter.component.css'
})
export class WaiterComponent {
  navigating: boolean = false
  protected service = inject(PendingService)

  constructor(router: Router) {
    // Surveillance de evenements de routage dans l'application
    router.events.subscribe({
      next: event => {
        switch (true) {
          case event instanceof NavigationStart:
            this.navigating = true
            break;
          case event instanceof NavigationEnd :
          case event instanceof NavigationCancel :
          case event instanceof NavigationError :
          case event instanceof NavigationSkipped :
            this.navigating = false
            break;
        }
      }
    })
  }
}
