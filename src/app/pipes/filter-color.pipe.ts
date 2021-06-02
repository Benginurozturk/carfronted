import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/color';

@Pipe({
  name: 'filterColor',
})
export class FilterColorPipe implements PipeTransform {
  transform(value: Color[], filterText: string): Color[] {
    return value.filter((c: Color) =>
      c.colorName?.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
    );
  }
}