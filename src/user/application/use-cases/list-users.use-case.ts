import UserRepository from '../../domain/repository/user.repository';
import { UserOutput, UserOutputMapper } from '../dto/user-output';
import { default as DefaultUseCase } from '../../../@seedwork/application/use-cases';
import { SearchInputDto } from '../../../@seedwork/application';
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from '../../../@seedwork/application';

export namespace ListUsersUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepo: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = UserRepository.SearchParams.create(input);
      const searchResult = await this.userRepo.search(params);
      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: UserRepository.SearchResult): Output {
      const { items: _items } = searchResult;
      const items = _items.map((i) => {
        return UserOutputMapper.toOutput(i);
      });
      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }

  export type Input = SearchInputDto<{ name?: string; email?: string }>;

  export type Output = PaginationOutputDto<UserOutput>;
}
export default ListUsersUseCase;
