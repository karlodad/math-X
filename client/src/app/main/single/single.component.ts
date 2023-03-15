import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SingleComponent implements OnInit {
  type: string = '';
  isGame$ = new BehaviorSubject<boolean>(false);
  isNewGame$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.type = this.activatedRoute.snapshot.queryParams['type'];
  }

  start(event: boolean) {
    this.isNewGame$.next(event);
    this.isGame$.next(true);
  }

  end() {
    this.isGame$.next(false);
  }
}
