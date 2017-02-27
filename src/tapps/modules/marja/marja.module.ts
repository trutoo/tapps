import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { MarjaComponent } from './marja.component';

export const ROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: MarjaComponent,
  }
]

@NgModule({
  imports: [
    FormsModule,
    MaterialModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    MarjaComponent
  ],
})

export class MarjaModule { }