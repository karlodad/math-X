import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SingleComponent implements OnInit {
  constructor(private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const type: string = this.activatedRoute.snapshot.queryParams['type'];
    console.log(type);
  }
}
