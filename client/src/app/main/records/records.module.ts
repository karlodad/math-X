import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import RecordsComponent from './records.component';

const routes: Routes = [{ path: '', component: RecordsComponent }];

@NgModule({
  declarations: [RecordsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export default class RecordsModule {}
