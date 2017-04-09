import { Component, OnInit } from '@angular/core';
import { TappsStore } from '../../tapps.store';
import { Theme } from '../../shared/components/bokeh/bokeh.component';
import { Color } from '../../shared/utilities/color';

@Component({
  selector: 'm-arc',
  templateUrl: './arc.component.html',
  styleUrls: ['./arc.component.css']
})

export class ArcComponent implements OnInit {

  static Theme: Theme = {
    primary: Color.FromHex('#f79d00'),
    secondary: Color.FromHex('#64f38c'),
    // primary: '#ffd89b',
    // secondary: '#19547b',
  }

  public width1: number = 1920;
  public width2: number = 16;
  public height1: number = 1080;
  public height2: number = 9;
  public ratio: number;
  public comparison: '16:9';

  constructor(
    public store: TappsStore
  ) { }

  ngOnInit() {
    this.store.setState({
      theme: ArcComponent.Theme,
    });
  }

  onChange(value: number, dimension: string) {
    if (this.width1 === null || this.height1 === null) return;
    this.ratio = this.height1 / this.width1;

    if (this.width2 === null && this.height2 === null) return;

    switch (dimension) {
      case 'width1':
        this.width2 = this.height2 / this.ratio;
        break;

      case 'width2':
        this.height2 = value * this.ratio;
        break;

      case 'height1':
        this.height2 = this.width2 / this.ratio;
        break;

      case 'height2':
        this.width2 = value / this.ratio;
        break;
    }
  }
}