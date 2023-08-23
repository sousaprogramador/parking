import { InMemorySearchableRepository } from '../../../../common/domain';
import { SortDirection } from '../../../../common/domain';
import { User, UserId, UserRepository } from '../../../domain';

export class UserInMemoryRepository
  extends InMemorySearchableRepository<User, UserId, UserRepository.Filter>
  implements UserRepository.Repository
{
  sortableFields: string[] = ['name', 'email', 'created_at'];

  protected async applyFilter(
    items: User[],
    filter: UserRepository.Filter,
  ): Promise<User[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      const hasName =
        filter.name &&
        i.props.name.toLowerCase().includes(filter.name.toLowerCase());
      const hasEmail =
        filter.email &&
        i.props.email.toLowerCase().includes(filter.email.toLowerCase());

      return hasName || hasEmail;
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
