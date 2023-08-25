import { UserRepository } from '../../domain';
import { UserOutput, UserOutputMapper } from '../dto';
import {
  SearchInputDto,
  PaginationOutputDto,
  PaginationOutputMapper,
  UseCase as DefaultUseCase,
} from '../../../common';

export namespace ListUsersUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepo: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = UserRepository.SearchParams.create(input);
      const searchResult = await this.userRepo.search(params);
      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: UserRepository.SearchResult): Output {
      const items = searchResult.items.map((i) => {
        return UserOutputMapper.toOutput(i);
      });
      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }

  export type Input = SearchInputDto<{
    name?: string;
    email?: string;
  }>;

  export type Output = PaginationOutputDto<UserOutput>;
}

export default ListUsersUseCase;
