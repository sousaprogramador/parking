import GetUserUseCase from '../get-user.use-case';
import { UserInMemoryRepository } from '../../../infra/db';
import { User } from '../../../domain';
import { NotFoundError } from '../../../../common';

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

  it('should returns a user', async () => {
    const user = User.fake().aUser().build();
    const items = [user];
    repository.items = items;
    const spyFindById = jest.spyOn(repository, 'findById');
    const output = await useCase.execute({ id: user.id });
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      is_active: user.is_active,
      avatar: user.avatar,
      created_at: user.created_at,
    });
  });
});
