import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PlaySceneComponent } from './play-scene.component';

@NgModule({
  declarations: [PlaySceneComponent],
  imports: [CommonModule, NzSpinModule, NzButtonModule, NzIconModule],
  exports: [PlaySceneComponent],
})
export class PlaySceneModule {}
