import {
  SearchableRepositoryInterface,
  SearchProps,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '../../../common';
import { User, UserId } from '../entities';

export namespace UserRepository {
  export type Filter = {
    name?: string;
    email?: string;
  };

  export class SearchParams extends DefaultSearchParams<Filter> {
    get filter(): Filter | null {
      return this._filter;
    }

    private constructor(props: SearchProps<Filter> = {}) {
      super(props);
    }

    static create(
      props: Omit<SearchProps<Filter>, 'filter'> & {
        filter?: {
          name?: string;
          email?: string;
        };
      } = {},
    ) {
      return new SearchParams({
        ...props,
        filter: {
          name: props.filter?.name || null,
          email: props.filter?.email || null,
        },
      });
    }

    protected set filter(value: Filter | null) {
      const _value =
        !value || (value as unknown) === '' || typeof value !== 'object'
          ? null
          : value;

      const filter = {
        ...(_value.name && { name: `${_value?.name}` }),
        ...(_value.email && { type: _value.email }),
      };

      this._filter = Object.keys(filter).length === 0 ? null : filter;
    }
  }

  export class SearchResult extends DefaultSearchResult<User, Filter> {}

  export type Repository = SearchableRepositoryInterface<
    User,
    UserId,
    Filter,
    SearchParams,
    SearchResult
  >;
}

export default UserRepository;
