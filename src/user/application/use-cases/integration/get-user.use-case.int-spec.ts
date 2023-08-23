import { DataSource } from 'typeorm';
import { GetUserUseCase } from '../get-user.use-case';
import { User } from '../../../domain';
import { UserTypeOrmRepository, UserEntity } from '../../../infra/db';
import { NotFoundError } from '../../../../common';
import { databaseProviders } from '../../../../database/database.providers';

describe('GetUserUseCase Integration Tests', () => {
  let useCase: GetUserUseCase.UseCase;
  let repository: UserTypeOrmRepository;
  let dataSource: DataSource;

  beforeEach(async () => {
    dataSource = await databaseProviders[0].useFactory();
    repository = new UserTypeOrmRepository(
      dataSource.getRepository(UserEntity),
    );
    useCase = new GetUserUseCase.UseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    await expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`),
    );
  });

  it('should returns a user', async () => {
    const user = User.fake().aUser().build();
    await repository.insert(user);

    const output = await useCase.execute({ id: user.id });
    expect(output).toStrictEqual({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      avatar: user.avatar,
      is_active: user.is_active,
      created_at: user.created_at,
    });
  });
});
