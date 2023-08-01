/* eslint-disable @typescript-eslint/no-namespace */
import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '../../../common';
import { User, UserId } from '../entities';

export namespace UserRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

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
