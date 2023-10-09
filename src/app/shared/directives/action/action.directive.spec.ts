import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActionDirective } from './action.directive';
import { ActionDirectiveModule } from './action.module';
import { Component } from '@angular/core';

describe(ActionDirective.name, () => {

  let fixture: ComponentFixture<ActionDirectiveTestComponent>;
  let component: ActionDirectiveTestComponent;

  //base structure of the beforeEach(...);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionDirectiveTestComponent],
      //all the module was imported
      imports: [ActionDirectiveModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionDirectiveTestComponent);
    component = fixture.componentInstance;
  });


  it(`(D) (@output appAction) should emit event with payload when Enter key is pressed`, () => {
    const div: HTMLElement = fixture.nativeElement.querySelector('.just-to-be-used-in-the-test');
    const event = new KeyboardEvent('keyup', { key: 'Enter' });

    //trigger the event
    div.dispatchEvent(event);

    expect(component.hasEvent()).toBe(true);
  });

  it(`(D) (@output appAction) should emit event with payload when Clicked`, () => {
    const div: HTMLElement = fixture.nativeElement.querySelector('.just-to-be-used-in-the-test');

    //mouse click
    const event = new Event('click');

    //trigger the event
    div.dispatchEvent(event);

    expect(component.hasEvent()).toBe(true);
  });
});

//Fake component just to test the directive
//No selector because it's will nor be used in other component
//No .html file. The component has its template declared in line
@Component({
  template: `<div class="just-to-be-used-in-the-test" (appAction)="actionHandler($event)"></div>`,
})
class ActionDirectiveTestComponent {

  private event: Event = null;

  public actionHandler(event: Event) {
    this.event = event;
  }

  public hasEvent(): boolean {
    //!! fancy way to parse to boolean, it means: is not null.
    return !!this.event;
  }
}
