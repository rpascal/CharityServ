import { NgModule } from '@angular/core';
import { ServiceByIdPipe } from './service-by-id/service-by-id';
import { DateTimeFormatPipe } from './date-time-format/date-time-format';
import { CharityByIdPipe } from './charity-by-id/charity-by-id';
@NgModule({
	declarations: [ServiceByIdPipe,
    DateTimeFormatPipe,
    CharityByIdPipe],
	imports: [],
	exports: [ServiceByIdPipe,
    DateTimeFormatPipe,
    CharityByIdPipe]
})
export class PipesModule {}
