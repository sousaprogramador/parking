import ListUsersUseCase from '../list-users.use-case';
import { UserInMemoryRepository } from '../../../infra/db';
import { User, UserRepository } from '../../../domain';
import { UserOutputMapper } from '../../dto';

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

    const entity = User.fake().aUser().withEmail('teste@mail.com').build();
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

  it('should search sorted by createdAt when input param is empty', async () => {
    const items = [
      User.fake().aUser().build(),
      User.fake()
        .aUser()
        .withCreatedAt(new Date(new Date().getTime() + 100))
        .build(),
    ];
    repository.items = items;

    const output = await useCase.execute({});
    expect(output).toStrictEqual({
      items: [...items].reverse().map(UserOutputMapper.toOutput),
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });

  it('should search applying paginate and filter by name', async () => {
    const createdAt = new Date();
    const users = [
      User.fake().aUser().withName('test').withCreatedAt(createdAt).build(),
      User.fake().aUser().withName('a').withCreatedAt(createdAt).build(),
      User.fake().aUser().withName('TEST').withCreatedAt(createdAt).build(),
      User.fake().aUser().withName('TeSt').withCreatedAt(createdAt).build(),
    ];
    await repository.bulkInsert(users);

    let output = await useCase.execute({
      page: 1,
      per_page: 2,
      filter: { name: 'TEST' },
    });
    expect(output).toStrictEqual({
      items: [users[0], users[2]].map(UserOutputMapper.toOutput),
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 2,
      per_page: 2,
      filter: { name: 'TEST' },
    });
    expect(output).toStrictEqual({
      items: [users[3]].map(UserOutputMapper.toOutput),
      total: 3,
      current_page: 2,
      per_page: 2,
      last_page: 2,
    });
  });

  describe('should search applying filter by name, sort and paginate', () => {
    const users = [
      User.fake().aUser().withName('test').build(),
      User.fake().aUser().withName('a').build(),
      User.fake().aUser().withName('TEST').build(),
      User.fake().aUser().withName('e').build(),
      User.fake().aUser().withName('TeSt').build(),
    ];

    const arrange = [
      {
        input: {
          page: 1,
          per_page: 2,
          sort: 'name',
          filter: { name: 'TEST' },
        },
        output: {
          items: [users[2], users[4]].map(UserOutputMapper.toOutput),
          total: 3,
          current_page: 1,
          per_page: 2,
          last_page: 2,
        },
      },
      {
        input: {
          page: 2,
          per_page: 2,
          sort: 'name',
          filter: { name: 'TEST' },
        },
        output: {
          items: [users[0]].map(UserOutputMapper.toOutput),
          total: 3,
          current_page: 2,
          per_page: 2,
          last_page: 2,
        },
      },
    ];

    beforeEach(async () => {
      await repository.bulkInsert(users);
    });

    test.each(arrange)(
      'when value is $search_params',
      async ({ input, output: expectedOutput }) => {
        const output = await useCase.execute(input);
        expect(output).toStrictEqual(expectedOutput);
      },
    );
  });
});
