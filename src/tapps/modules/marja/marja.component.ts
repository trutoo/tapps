import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'm-marja',
  templateUrl: './marja.component.html',
  styleUrls: ['./marja.component.css']
})

export class MarjaComponent implements OnInit {

  private coolness: number;

  constructor() {
    this.coolness = 200;
  }

  ngOnInit() { }
}