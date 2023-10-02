import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumberRu',
  standalone: true,
})
export class PhoneNumberRuPipe implements PipeTransform {
  transform(value: string): unknown {
    const stringValue = value.toString();

    const formattedValue =
      '+' +
      stringValue.charAt(0) +
      ' (' +
      stringValue.substring(1, 4) +
      ') ' +
      stringValue.substring(4, 7) +
      '-' +
      stringValue.substring(7);

    return formattedValue;
  }
}
