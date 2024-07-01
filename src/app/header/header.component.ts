import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
    selector: 'app-header',
    standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
  classActive="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
}
