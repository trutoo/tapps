import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { ArcComponent } from './arc.component';

export const ROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: ArcComponent,
  }
]

@NgModule({
  imports: [
    MaterialModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    ArcComponent
  ],
})

export class ArcModule { }