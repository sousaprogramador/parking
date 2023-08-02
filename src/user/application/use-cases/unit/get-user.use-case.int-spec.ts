import { GetUserUseCase } from '../get-user.use-case';
import { UserRepository, UserEntity } from '../../../infra/typeorm';
import { DataSource } from 'typeorm';
import { databaseProviders } from '../../../../database/database.providers';

describe('GetUserUseCase Integration Tests', () => {
  let useCase: GetUserUseCase.UseCase;
  let repository: UserRepository;
  let dataSource: DataSource;

  beforeEach(async () => {
    dataSource = await databaseProviders[0].useFactory();
    repository = new UserRepository(dataSource.getRepository(UserEntity));
    useCase = new GetUserUseCase.UseCase(repository);
  });

  it('should create a user', async () => {
    const all = await repository.findAll();
    console.log('all', all);
  });
});
