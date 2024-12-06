import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform( users: User[], text: string ): User[] {

    if ( text.length === 0 ) { return users; }
    //console.log(text);
    //console.log('users in pipe', users);
    text = text.toLocaleLowerCase();

    return users.filter( (user: any) => {
      return user.data.name.toLocaleLowerCase().includes(text)
             || user.data.phoneNo.toLocaleLowerCase().includes(text);
    });

  }

}
