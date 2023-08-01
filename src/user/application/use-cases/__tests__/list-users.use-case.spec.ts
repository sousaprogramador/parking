import ListUsersUseCase from '../../list-users.use-case';
import UserInMemoryRepository from '../../../../infra/db/in-memory/user-in-memory.repository';
import { User } from '../../../../domain/entities';
import UserRepository from '../../../../domain/repository/user.repository';

describe('ListUsersUseCase Unit Tests', () => {
  let useCase: ListUsersUseCase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new ListUsersUseCase.UseCase(repository);
  });

  test('toOutput method', () => {
    let result = new UserRepository.SearchResult({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_dir: null,
      filter: null,
    });
    let output = useCase['toOutput'](result);
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });

    const entity = new User({
      name: 'some test',
      email: 'sometest@mail.com',
      password: '1234',
      is_active: true,
      avatar: null,
    });

    result = new UserRepository.SearchResult({
      items: [entity],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_dir: null,
      filter: null,
    });

    output = useCase['toOutput'](result);
    expect(output).toStrictEqual({
      items: [entity.toJSON()],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });
  });

  it('should return output sorted by created_at when input param is empty', async () => {
    const items = [
      new User({
        name: 'some test',
        email: 'sometest@mail.com',
        password: '1234',
        is_active: true,
        avatar: null,
      }),
      new User({
        name: 'some test 2',
        email: 'sometest2@mail.com',
        password: '1234',
        is_active: false,
        avatar: null,
        created_at: new Date(new Date().getTime() + 100),
      }),
    ];
    repository.items = items;

    const output = await useCase.execute({});
    expect(output).toStrictEqual({
      items: [...items].reverse().map((i) => i.toJSON()),
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });
});
