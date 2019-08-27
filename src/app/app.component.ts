import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'unsubscribeしないこだれだ';
  labels = ['menu1', 'menu2', 'menu3'];
  ghost$ = new Subject();
  stream;
  active: number;

  ngOnInit() {
    this.stream = this.ghost$.asObservable();
  }

  onClick(i: number) {
    this.active = i;
  }

  onSend() {
    this.ghost$.next();
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }
}
