import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-photo-frame',
  templateUrl: './photo-frame.component.html',
  styleUrls: ['./photo-frame.component.scss'],
})
export class PhotoFrameComponent implements OnInit {

  @Output() liked: EventEmitter<void> = new EventEmitter();
  @Input() description: string = '';
  @Input() src: string = '';
  @Input() likes: number = 0;

  constructor() {}

  ngOnInit(): void {}

  public like(): void {
    this.liked.emit();
  }
}
