import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  @Input() label: string;
  @Input() stream: Observable<void>;

  constructor() { }

  ngOnInit() {
    // console.log('ngOnInitされたよ');
    this.stream.pipe(first()).subscribe(() => {
      console.log('unsubscribeしないこだれだ');
    });
  }

  ngOnDestroy() {
    // console.log('ngOnDestroyされたよ');
  }

}
