import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-photo-frame',
  templateUrl: './photo-frame.component.html',
  styleUrls: ['./photo-frame.component.scss'],
})
export class PhotoFrameComponent implements OnInit, OnDestroy {

  @Output() liked: EventEmitter<void> = new EventEmitter();
  @Input() description: string = '';
  @Input() src: string = '';
  @Input() likes: number = 0;

  //debounceSubject is a Subject to work with debounceTime(500) avoiding a lot of clicks on like
  private debounceSubject: Subject<void> = new Subject();
  private unsubscribe: Subject<void> = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.debounceSubject
      .asObservable()
      //debounceTime of 500 miliseconds was added
      .pipe(debounceTime(500))
      //takeUntil(this.unsubscribe) it links the asObservable to unsubscribe
      .pipe(takeUntil(this.unsubscribe))
      //subscribe() to invoke the emit event
      .subscribe(() => this.liked.emit());
  }

  ngOnDestroy(): void {
    //because of takeUntil(this.unsubscribe), it uses .next() and .complete() to unsubscribe
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public like(): void {
    console.log("!!!! frame")
    //to invoke the debounceSubject asObservable()
    this.debounceSubject.next();
  }
}
