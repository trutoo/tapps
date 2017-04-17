import { Component, OnInit } from '@angular/core';
import { TappsStore } from '../../tapps.store';
import { Theme } from '../../shared/components/bokeh/bokeh.component';
import { Color } from '../../shared/utilities/color';
import { MathX } from '../../shared/utilities/mathx';

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
  public ratio: number = 0.5625;
  public comparison: string = '16:9';
  public precision: number = 2;

  constructor(
    public store: TappsStore
  ) { }

  ngOnInit() {
    this.store.setState({
      theme: ArcComponent.Theme,
    });
  }

  onChange(dimension: string) {
    if (this.width1 === null || this.height1 === null) return;
    const w1 = this.width1, h1 = this.height1;
    this.ratio = h1 / w1;

    if (this.width2 === null && this.height2 === null) return;
    const w2 = this.width2, h2 = this.height2;

    switch (dimension) {
      case 'width1':
        this.width2 = MathX.roundDecimals(h2 / this.ratio, this.precision);
        break;

      case 'width2':
        this.height2 = MathX.roundDecimals(w2 * this.ratio, this.precision);
        break;

      case 'height1':
        this.height2 = MathX.roundDecimals(w2 * this.ratio, this.precision);
        break;

      case 'height2':
        this.width2 = MathX.roundDecimals(h2 / this.ratio, this.precision);
        break;
    }
  }
}