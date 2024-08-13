import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../models/user.model';

@Pipe({
  name: 'user',
  standalone: true,
})
export class UserPipe implements PipeTransform {
  transform(value: UserModel[], search: string): UserModel[] {
    if (!search) {
      return value;
    }

    return value.filter(
      (u) =>
        u.fullName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        u.userName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        u.email.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }
}
