import { InMemorySearchableRepository } from '@/@seedwork/domain';
import { SortDirection } from '@/@seedwork/domain';
import { User, UserId, UserRepository } from '@/user/domain';

export class UserInMemoryRepository
  extends InMemorySearchableRepository<User, UserId, UserRepository.Filter>
  implements UserRepository.Repository
{
  sortableFields: string[] = ['name', 'email'];

  protected async applyFilter(
    items: User[],
    filter: UserRepository.Filter,
  ): Promise<User[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      const hasUserName =
        filter.name &&
        i.props.name.toLowerCase().includes(filter.name.toLowerCase());
      const hasEmail =
        filter.email &&
        i.props.email.toString().includes(filter.email.toString());

      return hasEmail || hasUserName;
    });
  }

  protected applySort(
    items: User[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ): Promise<User[]> {
    return !sort
      ? super.applySort(items, 'created_at', 'desc')
      : super.applySort(items, sort, sort_dir);
  }
}

export default UserInMemoryRepository;
