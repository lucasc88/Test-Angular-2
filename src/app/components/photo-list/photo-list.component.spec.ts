import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoListModule } from './photo-list.module';
import { PhotoListComponent } from './photo-list.component';
import { PhotoBoardService } from 'src/app/shared/components/photo-board/services/photo-board.service';
import { buildPhotoList } from 'src/app/shared/components/photo-board/test/build-photo-list';

describe(PhotoListComponent.name, () => {

  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;
  let service: PhotoBoardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PhotoListModule,
        //must import HttpClientModule because PhotoListComponent depends on its service
        HttpClientModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;

    //Service injection
    service = TestBed.inject(PhotoBoardService);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('(D) should display board when data arrives', () => {
    //uses this mock array
    const photos = buildPhotoList();

    //spy on service.getPhotos() and return the mock array value
    spyOn(service, 'getPhotos').and.returnValue(of(photos));//of(photos) is to parse to Observable

    //detectChanges() only after to set the service behavior- in the spy
    fixture.detectChanges();//trigger onInit()

    //get the child component
    const board = fixture.nativeElement.querySelector('app-photo-board');

    //get the loader by class
    const loader = fixture.nativeElement.querySelector('.loader');

    //if there is board, the loader is not expected
    expect(board).not.toBeNull();
    expect(loader).toBeNull();
  });

  it('(D) should display loader while waiting for data', () => {
    //spy on service.getPhotos() and return the mock array value
    spyOn(service, 'getPhotos').and.returnValue(null);//of(photos) is to parse to Observable

    //detectChanges() only after to set the service behavior- in the spy
    fixture.detectChanges();//trigger onInit()

    //get the child component
    const board = fixture.nativeElement.querySelector('app-photo-board');

    //get the loader by class
    const loader = fixture.nativeElement.querySelector('.loader');

    //if there is board, the loader is not expected
    expect(board).toBeNull();
    expect(loader).not.toBeNull();
  });

});
