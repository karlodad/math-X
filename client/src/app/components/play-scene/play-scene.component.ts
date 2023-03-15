import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-play-scene',
  templateUrl: './play-scene.component.html',
  styleUrls: ['./play-scene.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaySceneComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
