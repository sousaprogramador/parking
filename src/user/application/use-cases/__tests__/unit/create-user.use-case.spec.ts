import CreateUserUseCase from '../../create-user.use-case';
import UserInMemoryRepository from '../../../../infra/db/in-memory/user-in-memory.repository';

describe('CreateUserUseCase Unit Tests', () => {
  let useCase: CreateUserUseCase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new CreateUserUseCase.UseCase(repository);
  });

  it('should create a user', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');
    let output = await useCase.execute({
      name: 'some test',
      email: 'sometest@mail.com',
      password: '1234',
      is_active: true,
      avatar: null,
    });
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: 'some test',
      email: 'sometest@mail.com',
      password: repository.items[0].password,
      is_active: true,
      avatar: null,
      created_at: repository.items[0].created_at,
    });

    output = await useCase.execute({
      name: 'some test',
      email: 'sometest@mail.com',
      password: '1234',
      is_active: false,
    });
    expect(spyInsert).toHaveBeenCalledTimes(2);
    expect(output).toStrictEqual({
      id: repository.items[1].id,
      name: 'some test',
      email: 'sometest@mail.com',
      password: repository.items[1].password,
      is_active: false,
      avatar: null,
      created_at: repository.items[1].created_at,
    });
  });
});
