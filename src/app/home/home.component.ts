import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component, OnChanges,
  OnDestroy,
  OnInit, QueryList, SimpleChanges, ViewChildren
} from '@angular/core';
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
export class HomeComponent implements OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, AfterContentChecked, OnDestroy, OnChanges{

  @ViewChildren(CardComponent)
  cards?: QueryList<CardComponent>

  ngAfterContentChecked(): void {
    alert("Content Checked")
    console.log(this.cards)
  }

  ngAfterContentInit(): void {
    alert("Content Init")
    console.log(this.cards)
  }

  ngAfterViewChecked(): void {
    alert("View Checked")
    console.log(this.cards)
  }

  ngAfterViewInit(): void {
    alert("View Init")
    console.log(this.cards)
  }

  ngOnChanges(changes: SimpleChanges): void {
    alert("Changes")
    console.log(changes)
  }

  ngOnDestroy(): void {

    alert("Destroyed")
  }

  ngOnInit(): void {
    alert("Init")
    console.log(this.cards)
  }

  constructor() {
    alert("constuction")
    console.log(this.cards)
  }
}
