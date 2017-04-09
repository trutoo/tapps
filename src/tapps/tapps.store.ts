import { Theme } from './shared/components/bokeh/bokeh.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/distinctUntilChanged';

import { Color } from './shared/utilities/color';

export interface State {
  theme: Theme;
}

const defaultState: State = {
  theme: {
    primary: new Color(255, 255, 255),
    secondary: new Color(0, 0, 0),
  },
}

const store = new BehaviorSubject<State>(defaultState);

@Injectable()
export class TappsStore {

  private _store = store;

  public changes = this._store.asObservable().distinctUntilChanged()

  setState(state: State) {
    this._store.next(Object.assign({}, this.getState(), state));
  }

  getState(): State {
    return this._store.value;
  }

  purge() {
    this._store.next(defaultState);
  }
}