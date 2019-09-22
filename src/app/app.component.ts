import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'unsubscribeしないこだれだ';
  labels = [1, 2, 3];
  ghost$ = new Subject();
  show$ = new Subject<string>();
  stream;
  active: number = 1;

  constructor(private render: Renderer2) { }

  ngOnInit() {
    this.stream = this.ghost$.asObservable();
    this.show$.subscribe(x => this.showGhost(x));
  }

  onClick(i: number) {
    this.active = i;
  }

  onSend() {
    this.ghost$.next();
  }

  changeActive(i: number) {
    this.active = i;
  }

  showGhost(x: string) {
    const ghost = this.render.createElement('img');
    this.render.setAttribute(ghost, 'src', `assets/ghost${x}.svg`);
    this.render.addClass(ghost, 'ghost');
    this.render.setStyle(ghost, 'left', `${this.getRandomLeft()}px`);
    this.render.setStyle(ghost, 'top', `${this.getRandomTop()}px`);
    this.render.appendChild(document.body, ghost);
  }

  getRandomLeft() {
    const times = Math.floor(window.innerWidth / 100);
    let random = 0;
    for (let i = 0; i < times; i++) {
      random += Math.random() * 100;
    }
    return random;
  }

  getRandomTop() {
    const times = Math.floor(window.innerHeight / 100);
    let random = 0;
    for (let i = 0; i < times; i++) {
      random += Math.random() * 100;
    }
    return random;
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }
}
