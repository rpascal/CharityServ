import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewRequestsPage } from './view-requests';

@NgModule({
  declarations: [
    ViewRequestsPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewRequestsPage),
    PipesModule,
  ],
})
export class ViewRequestsPageModule {}
