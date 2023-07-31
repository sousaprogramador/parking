import DeleteUserUseCase from '../../delete-user.use-case';
import UserInMemoryRepository from '../../../../infra/db/in-memory/user-in-memory.repository';
import { NotFoundError } from '../../../../../@seedwork/domain/errors/not-found.error';
import { User } from '../../../../domain/entities';

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
    await useCase.execute({
      id: items[0].id,
    });
    expect(repository.items).toHaveLength(0);
  });
});
