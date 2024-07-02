import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {CardComponent} from "../../common/components/card/card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    CardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
