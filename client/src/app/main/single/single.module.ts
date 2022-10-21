import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import SingleComponent from './single.component';

const routes: Routes = [{ path: '', component: SingleComponent }];

@NgModule({
  declarations: [SingleComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export default class SingleModule {}
