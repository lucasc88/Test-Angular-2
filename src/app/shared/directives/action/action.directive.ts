import { Directive, EventEmitter, Output, HostListener } from '@angular/core';

@Directive({
  selector: '[appAction]',
})
export class ActionDirective {

  //to create a directive like this:
  //<div (appAction)="methodName()" , we need to create the @Output() using the same directive name
  @Output() public appAction: EventEmitter<Event> = new EventEmitter();

  //@HostListener('click', ['$event']) means when click event happens, ['$event'] will be received as parameter
  @HostListener('click', ['$event'])
  public handleClick(event: Event): void {
    //event will be emitted
    this.appAction.emit(event);
  }

//@HostListener('keyup', ['$event']) means when keyup event happens, ['$event'] will be received as parameter
  @HostListener('keyup', ['$event'])
  public handleKeyup(event: KeyboardEvent): void {
    //event will be emitted
    this.appAction.emit(event);
  }
}
