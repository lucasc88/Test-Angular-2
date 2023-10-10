import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
} from '@angular/core';
import { Photo } from './interfaces/photo';

@Component({
  selector: 'app-photo-board',
  templateUrl: './photo-board.component.html',
  styleUrls: ['./photo-board.component.scss'],
})
export class PhotoBoardComponent implements OnInit, OnChanges {

  //photo array will be received from backend
  @Input() public photos: Photo[];

  //each row will have 4 photos - multidimencional array
  public rows: any[][] = [];

  constructor() {}

  ngOnInit(): void {}

  //this method will run everytime @Input() is changed
  ngOnChanges(changes: SimpleChanges): void {
    //to detect changes in the @Input()
    if (changes.photos) {
      //get the new value
      this.rows = this.groupColumns(changes.photos.currentValue);
    }
  }

  private groupColumns(photos: Photo[]): any[][] {
    const newRows = [];
    const step = 4;
    if (photos) {
      for (let index = 0; index < photos.length; index += step) {
        //slice() will cut the array into 4 positions.
        //the newRows will be an array of array
        newRows.push(photos.slice(index, index + step));
      }
    }
    return newRows;
  }
}
