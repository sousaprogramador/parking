import GetUserUseCase from '../../get-user.use-case';
import UserInMemoryRepository from '../../../../infra/db/in-memory/user-in-memory.repository';
import { NotFoundError } from '../../../../../@seedwork/domain';
import { User } from '../../../../domain/entities';

describe('GetUserUseCase Unit Tests', () => {
  let useCase: GetUserUseCase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new GetUserUseCase.UseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    await expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`),
    );
  });

  it('should returns a User', async () => {
    const items = [
      new User({
        name: 'some test',
        email: 'sometest@mail.com',
        password: '1234',
        is_active: true,
        avatar: null,
      }),
    ];
    repository.items = items;
    const spyFindById = jest.spyOn(repository, 'findById');
    const output = await useCase.execute({ id: items[0].id });
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: items[0].id,
      name: 'some test',
      email: 'sometest@mail.com',
      password: '1234',
      is_active: true,
      avatar: null,
      created_at: items[0].created_at,
    });
  });
});
