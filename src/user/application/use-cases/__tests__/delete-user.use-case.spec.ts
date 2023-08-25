import DeleteUserUseCase from '../delete-user.use-case';
import { UserInMemoryRepository } from '../../../infra/db';
import { User } from '../../../domain';
import { NotFoundError } from '../../../../common';

describe('DeleteUserUseCase Unit Tests', () => {
  let useCase: DeleteUserUseCase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new DeleteUserUseCase.UseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    await expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`),
    );
  });

  it('should delete a user', async () => {
    const user = User.fake().aUser().build();
    const items = [user];
    repository.items = items;
    await useCase.execute({
      id: user.id,
    });
    expect(repository.items).toHaveLength(0);
  });
});
