import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import MultiComponent from './multi.component';

const routes: Routes = [{ path: '', component: MultiComponent }];

@NgModule({
  declarations: [MultiComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export default class MultiModule {}
