import { TappsStore } from '../../tapps.store';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Theme } from '../../shared/components/bokeh/bokeh.component';
import { Color } from '../../shared/utilities/color';

@Component({
  selector: 'm-marja',
  templateUrl: './marja.component.html',
  styleUrls: ['./marja.component.css']
})

export class MarjaComponent implements OnInit {

  static Theme: Theme = {
    primary: Color.FromHex('#eecda3'),
    secondary: Color.FromHex('#ef629f'),
  }

  private coolness: number;

  constructor(
    private store: TappsStore,
  ) {
    this.coolness = 200;
  }

  ngOnInit() {
    this.store.setState({
      theme: MarjaComponent.Theme,
    });
  }
}