import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment'
/**
 * Generated class for the DateTimeFormatPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'dateTimeFormat',
})
export class DateTimeFormatPipe implements PipeTransform {
  transform(value: Date) {
    return moment(value).format("dddd, MMMM Do YYYY, h:mm a");
  }
}
