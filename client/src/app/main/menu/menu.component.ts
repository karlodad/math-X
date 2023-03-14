import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MenuComponent implements OnInit {
  constructor(private readonly router: Router) {}

  async ngOnInit() {}

  singleGame(type = 'infinity') {
    this.router.navigate(['main', 'single'], { queryParams: { type } });
  }

  records(type = 'infinity') {
    this.router.navigate(['main', 'records'], { queryParams: { type } });
  }

  multiGame() {
    this.router.navigate(['main', 'multi']);
  }
}
