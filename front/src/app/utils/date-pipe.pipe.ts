import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe'
})
export class DatePipePipe implements PipeTransform {

  transform(value: string | undefined | null): string {
    if(value == undefined){
      return "";
    }
    const timeZoneOffset: number = new Date().getTimezoneOffset();
    const localDate = new Date(value);
    localDate.setMinutes(localDate.getMinutes());
    return localDate.toLocaleDateString(undefined, {day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'});
  }

}
