import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import SingleComponent from './single.component';
import PlayResultModule from 'src/app/components/play-result/play-result.module';

const routes: Routes = [{ path: '', component: SingleComponent }];

@NgModule({
  declarations: [SingleComponent],
  imports: [CommonModule, PlayResultModule, RouterModule.forChild(routes)],
})
export default class SingleModule {}
