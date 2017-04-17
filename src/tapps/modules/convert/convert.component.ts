import { ViewChild, Component, OnInit, ElementRef } from '@angular/core';
import { TappsStore } from '../../tapps.store';
import { Color } from '../../shared/utilities/color';
import { Theme } from '../../shared/components/bokeh/bokeh.component';
import { FormatterService } from './formatter.service';

@Component({
  selector: 'app-convert',
  providers: [FormatterService],
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.css']
})
export class ConvertComponent implements OnInit {

  static Theme: Theme = {
    primary: Color.FromHex('#F3904F'),
    secondary: Color.FromHex('#3B4371'),
    // primary: '#ffd89b',
    // secondary: '#19547b',
  }

  @ViewChild('contentDOM') contentDOM: ElementRef;

  content = '';

  constructor(
    private store: TappsStore,
    private formatter: FormatterService
  ) { }

  ngOnInit() {
    this.store.setState({
      theme: ConvertComponent.Theme,
    });
  }

  input(event: Event) {
    this.content = this.formatter.format(event.target.value);
  }

  scroll(event: Event) {
    this.contentDOM.nativeElement.scrollTop = event.target.scrollTop;
  }
}
