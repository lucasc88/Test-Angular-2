import { SimpleChanges, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoBoardComponent } from './photo-board.component';
import { PhotoBoardModule } from './photo-board.module';
import { Photo } from './interfaces/photo';

//Object creation just to be used in the test
function buildPhotoList(): Photo[] {
  const photos: Photo[] = [];
  for (let i = 0; i < 8; i++) {
    photos.push({
      id: i + 1,
      url: '',
      description: '',
    });
  }
  return photos;
}

describe(PhotoBoardComponent.name, () => {
  let component: PhotoBoardComponent;
  let fixture: ComponentFixture<PhotoBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoBoardModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoBoardComponent);
    component = fixture.componentInstance;
  });

  it('Should display rows and columns when (@Input photos) has value', () => {
    component.photos = buildPhotoList(); //in this part, ngOnChanges will not be invoked
    fixture.detectChanges(); //to trigger ngOnInit()

    //to trigger ngOnChanges, we need to create a SimpleChanges object
    const change: SimpleChanges = {
      //we can put more than one attribute name but must be the same name of the component @Input() attribute
      //in this case: photos
      photos: new SimpleChange([], component.photos, true), //parameters: previous value is an empty array, current array, first change
    };

    //now we have the ngOnChanges working indeed
    component.ngOnChanges(change);

    expect(component.rows.length).withContext('Number of Rows').toBe(2);

    expect(component.rows[0].length).withContext('Number of Collumns in the first row').toBe(4);

    expect(component.rows[1].length).withContext('Number of Collumns in the second row').toBe(4);
  });
});
