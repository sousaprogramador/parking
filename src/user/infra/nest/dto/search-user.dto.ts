import { Transform } from 'class-transformer';
import { SortDirection } from '../../../../common';
import { ListUsersUseCase } from '../../../application';

export class SearchUserDto implements ListUsersUseCase.Input {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  @Transform(({ value }) => {
    if (value) {
      return {
        ...(value.name && { name: value.name }),
        ...(value.email && {
          email: value.email,
        }),
      };
    }

    return value;
  })
  filter?: {
    name?: string;
    email?: string;
  };
}
