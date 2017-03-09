import { Component, OnInit } from '@angular/core';
import { TappsStore } from '../../tapps.store';
import { Theme } from '../../shared/components/bokeh/bokeh.component';

@Component({
  selector: 'm-arc',
  templateUrl: './arc.component.html',
  styleUrls: ['./arc.component.css']
})

export class ArcComponent implements OnInit {

  static Theme: Theme = {
    primary: '#ffd89b',
    secondary: '#19547b',
  }

  constructor(
    private store: TappsStore
  ) { }

  ngOnInit() {

    this.store.setState({
      theme: ArcComponent.Theme,
    });
  }
}