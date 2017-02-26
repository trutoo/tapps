import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

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
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    ArcComponent
  ],
})

export class ArcModule { }