import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { ConvertComponent } from './convert.component';

export const ROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: ConvertComponent,
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    ConvertComponent
  ],
})

export class ConvertModule { }