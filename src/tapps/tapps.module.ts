import { NgModule, ApplicationRef, enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Route } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Hot Module Reloading */
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/* Base */
import { TappsStore } from './tapps.store';
import { TappsComponent } from './tapps.component';
import { TappsRoutingModule, ROUTING_PROVIDERS } from './tapps.routing';

/* Shared */
import { BokehComponent } from './shared/components/bokeh/bokeh.component';

@NgModule({
  bootstrap: [TappsComponent],
  declarations: [
    TappsComponent,
    BokehComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    TappsRoutingModule,
  ],
  providers: [
    TappsStore,
    ...ROUTING_PROVIDERS,
  ]
})

export class TappsModule {

  constructor(
    public appRef: ApplicationRef,
    public tappsStore: TappsStore
  ) { }

  hmrOnInit(store: any) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // Inject TappsStore here and update it
    this.tappsStore.setState(store.state)
    if ('restoreInputValues' in store) {
      store.restoreInputValues();
    }
    // Change detection
    this.appRef.tick();
    Object.keys(store).forEach(prop => delete store[prop]);
  }

  hmrOnDestroy(store: any) {
    const cmpLocation = this.appRef.components.map((cmp: any) => cmp.location.nativeElement);
    // Recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation)
    // Inject TappsStore and grab state then set it on store
    const currentState = this.tappsStore.getState()
    store.state = Object.assign({}, currentState)
    // Save input values
    store.restoreInputValues = createInputTransfer();
    // Remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: any) {
    // Display new elements
    store.disposeOldHosts()
    delete store.disposeOldHosts;
    // Anything you need done the component is removed
  }
}