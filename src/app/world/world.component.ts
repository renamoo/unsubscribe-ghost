import { Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss']
})
export class WorldComponent implements OnInit, OnDestroy {
  @Input() type: number;
  @Input() stream: Observable<void>;
  @Input() show: Subject<number>;
  sub: Subscription;

  constructor(private render: Renderer2) { }

  ngOnInit() {
    // console.log(`${this.type}:ngOnInitされたよ`);
    this.sub = this.stream.subscribe(() => {
      // 本来はEventEmitterとか使うところだけど、コンポーネントのインスタンスがなくなっても動いて欲しいのでsubject
      this.show.next(this.type);
    });
  }

  ngOnDestroy() {
    // console.log(`${this.type}:ngOnDestroyされたよ`);
    if (this.type === 3) {
      this.sub.unsubscribe();
    }
  }

}
