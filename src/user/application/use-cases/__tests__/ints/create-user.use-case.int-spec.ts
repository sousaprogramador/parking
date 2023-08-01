import { DataSource, Repository } from 'typeorm';
import { configDB } from '@/database';
import CreateUserUseCase from '../../create-user.use-case';
import { UserRepository, UserEntity } from '@/user/infra';

describe('CreateSignatureUseCase Integration Tests', () => {
  let useCase: CreateUserUseCase.UseCase;
  let repository: Repository<UserEntity>;
  let userRepository: UserRepository;
  let dataSource: DataSource;

  beforeAll(() => {
    dataSource = new DataSource(configDB);
    dataSource.initialize();
  });

  beforeEach(async () => {
    repository = dataSource.getRepository(UserEntity);
    userRepository = new UserRepository(repository);
    useCase = new CreateUserUseCase.UseCase(userRepository);
  });

  it('should create a category', async () => {
    console.log('repository', repository);
    const all = repository.create({
      name: 'japinha',
      password: 'eu',
    });
    console.log('all', all);
  });
});
