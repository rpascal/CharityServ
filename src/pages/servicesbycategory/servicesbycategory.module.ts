import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicesbycategoryPage } from './servicesbycategory';

@NgModule({
  declarations: [
    ServicesbycategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicesbycategoryPage),
    PipesModule
  ],
})
export class ServicesbycategoryPageModule {}
