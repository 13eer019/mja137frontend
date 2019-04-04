import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
    transform(item: any[], searchName: string): any[] {
        if (!item) {
           return [];
       }
        if (!searchName) {
           return item; }
           searchName = searchName.toLowerCase();
        return item.filter( it => {
            return (it.name.toLowerCase().includes(searchName) || it.id.toLowerCase().includes(searchName));
        });
       }
}
