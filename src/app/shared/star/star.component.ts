import { Component, OnChanges, Input, Output } from '@angular/core';
import { EventEmitter } from "@angular/core";

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {

  @Input() rating: number;
  @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

  starWidth: number;
  

  constructor() { }

  onClicked(): void {
    this.ratingClicked.emit(`Rating ${this.rating} clicked!`);
  }

  ngOnChanges() {
    this.starWidth = 75 * this.rating / 5;
  }
}
