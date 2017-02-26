import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Tapps */
import { ArcModule } from './modules/arc/arc.module';

export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'arc',
  },
  {
    path: 'arc',
    loadChildren: () => ArcModule,
  }
];

export const ROUTING_PROVIDERS: any[] = [

];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class TappsRoutingModule { }