import { Input, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'play-result',
  templateUrl: './play-result.component.html',
  styleUrls: ['./play-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PlayResultComponent implements OnInit {
  @Input() type: string = 'infinity';

  constructor() {}

  ngOnInit(): void {}
}
