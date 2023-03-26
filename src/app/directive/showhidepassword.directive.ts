import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appShowhidepassword]'
})
export class ShowhidepasswordDirective {

  @HostBinding() type: string;
     
  constructor(){
      this.type='password';
  }

  changeType(type:string): void {
      this.type = type;
  }

}
