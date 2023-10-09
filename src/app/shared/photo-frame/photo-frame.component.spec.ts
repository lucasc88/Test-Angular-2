import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { PhotoFrameComponent } from './photo-frame.component';
import { PhotoFrameModule } from './photo-frame.module';

describe(PhotoFrameComponent.name, () => {
  let fixture: ComponentFixture<PhotoFrameComponent> = null;
  let component: PhotoFrameComponent;

  //base structure of the beforeEach(...);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      //all the module was imported
      imports: [PhotoFrameModule],
    }).compileComponents();
    fixture = TestBed.createComponent(PhotoFrameComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //fakeAsync helps you to manage the time in situation when you need to wait for something
  it(`#${PhotoFrameComponent.prototype.like.name}
    should trigger (@Output like) once when called multiple times within debounce time`, fakeAsync(() => {
    fixture.detectChanges(); //to trigger the ngOninit()
    let times = 0;

    //determines the behaviour of the @Output liked,
    //in this case will be times++
    component.liked.subscribe(() => times++);

    //twice, but the debounce will block the second one
    component.like();
    component.like();

    //because of fakeAsync, it's possible to stop the time to test the debounceTime
    //in this case stops using tick(500).
    tick(500); //here will wait 500 miliseconds for debounceSubject initialization

    //expected to be 1
    expect(times).toBe(1);
  }));

  it(`#${PhotoFrameComponent.prototype.like.name}
    should trigger (@Output like) twice when called multiple times respecting the debounce time`, fakeAsync(() => {
    fixture.detectChanges(); //to trigger the ngOninit()
    let times = 0;

    component.liked.subscribe(() => times++);

    //twice, respecting the debounce
    component.like();
    tick(500);
    component.like();
    tick(500);

    //expected to be 2
    expect(times).toBe(2);
  }));

  //(D) means DOM - Just to know because it takes more time to test DOM elements
  it(`(D) should display number of likes when (@Input likes)is incremented`, () => {
    fixture.detectChanges(); //to trigger the ngOninit()
    component.likes++;

    fixture.detectChanges(); //to redraw the DOM to detect the incrementations (update the screen)

    //get the HTML element from the page
    const element = fixture.nativeElement.querySelector('.like-counter');

    expect(element.textContent.trim()).toBe('1'); //trim() to remove the space before/after
  });

  //(D) means DOM - Just to know because it takes more time to test DOM elements
  it(`(D) should display image with description when bound to properties`, () => {
    const description = 'some description';
    const src = 'http;//somesite.com/img.jpg';

    component.src = src;
    component.description = description;

    fixture.detectChanges();

    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(img.getAttribute('src')).toBe(src);
    expect(img.getAttribute('alt')).toBe(description);
  });

  it(`(D) should display number of likes when clicked`, done => {
    fixture.detectChanges();
    component.liked.subscribe(() => {
      component.likes++;
      fixture.detectChanges();//to redraw the page (to reflect the changes in the DOM)
      const counterElement: HTMLElement = fixture.nativeElement.querySelector('.like-counter');
      expect(counterElement.textContent.trim()).toBe('1');

      //It is a good practice to put the 'done' to say that the test has been run.
      //It's to say to Jasmine when the test is complete.
      done();
    });

    //get the element to trigger the click action
    const likeWidgetContainerElement: HTMLElement = fixture.nativeElement.querySelector('.like-widget-container');
    likeWidgetContainerElement.click();
  });
});
