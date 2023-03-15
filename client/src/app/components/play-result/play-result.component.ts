import { Input, Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { firstValueFrom, BehaviorSubject, takeUntil, finalize, take, catchError, EMPTY } from 'rxjs';
import { DestroyService } from 'src/app/services/destroy.service';
import { GameService } from 'src/app/services/game.service';
import { GameUtils } from 'src/app/utils/game-utils';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'play-result',
  templateUrl: './play-result.component.html',
  styleUrls: ['./play-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export default class PlayResultComponent implements OnInit {
  @Input() type: string = 'infinity';
  @Output() start = new EventEmitter<boolean>();

  isLoading$ = new BehaviorSubject<boolean>(true);
  prevScore$ = new BehaviorSubject<any>(null);
  title = '...';
  isContinedGame = false;

  constructor(
    private readonly msg: NzMessageService,
    private readonly gameService: GameService,
    private readonly router: Router,
    private readonly destroy$: DestroyService,
  ) {}

  ngOnInit(): void {
    this.title = GameUtils.transformNameFromType(this.type);
    this.isContinedGame = this.type === 'infinity';
    this.isLoading$.next(true);
    this.gameService
      .getGame(this.type)
      .pipe(
        take(1),
        takeUntil(this.destroy$),
        catchError((e) => (Utils.showError(e, this.msg.error.bind(this.msg)), EMPTY)),
        finalize(() => this.isLoading$.next(false)),
      )
      .subscribe((sub) => this.prevScore$.next(sub));
  }

  backToMenu() {
    this.router.navigate(['main']);
  }
}
