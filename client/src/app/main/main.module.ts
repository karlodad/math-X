import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import MainComponent from './main.component';
import MenuComponent from './menu/menu.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'menu',
        component: MenuComponent,
      },
      {
        path: 'records',
        loadChildren: () => import('./records/records.module').then((e) => e.default),
      },
      {
        path: 'single',
        loadChildren: () => import('./single/single.module').then((e) => e.default),
      },
      {
        path: 'multi',
        loadChildren: () => import('./multi/multi.module').then((e) => e.default),
      },
      {
        path: '**',
        redirectTo: 'menu',
      },
    ],
  },
];

@NgModule({
  declarations: [MainComponent, MenuComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class MainModule {}
