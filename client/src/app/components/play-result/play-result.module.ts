import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import PlayResultComponent from './play-result.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [PlayResultComponent],
  imports: [CommonModule, NzSpinModule, NzIconModule, NzButtonModule],
  exports: [PlayResultComponent],
})
export default class PlayResultModule {}
