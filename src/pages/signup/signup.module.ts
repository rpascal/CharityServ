// import { Directive } from 'ionic2-text-mask';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import {Ionic2MaskDirective} from "ionic2-mask-directive";
// import { Directive } from 'ionic2-input-mask'
@NgModule({
  declarations: [
    SignupPage,
    Ionic2MaskDirective,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],
  providers : [
    
  ],
  // Directive : [Directive]
})
export class SignupPageModule {}
