import { DataSource } from 'typeorm';
import CreateUserUseCase from '../create-user.use-case';
import { UserTypeOrmRepository, UserEntity } from '../../../infra/db';
import { databaseProviders } from '../../../../database/database.providers';
import { EntityValidationError } from '../../../../common/domain';

describe('CreateUserUseCase Int Tests', () => {
  let useCase: CreateUserUseCase.UseCase;
  let repository: UserTypeOrmRepository;
  let dataSource: DataSource;

  beforeEach(async () => {
    dataSource = await databaseProviders[0].useFactory();
    repository = new UserTypeOrmRepository(
      dataSource.getRepository(UserEntity),
    );
    useCase = new CreateUserUseCase.UseCase(repository);
  });

  describe('execute method', () => {
    it('should throw an entity validation error', async () => {
      try {
        await useCase.execute({} as any);
        fail('Should throw an entity validation error');
      } catch (e) {
        expect(e).toBeInstanceOf(EntityValidationError);
        expect(e.error).toEqual({
          name: [
            'name must be shorter than or equal to 255 characters',
            'name should not be empty',
            'name must be a string',
          ],
          email: [
            'email must be an email',
            'email should not be empty',
            'email must be shorter than or equal to 255 characters',
            'email must be a string',
          ],
          password: [
            'password should not be empty',
            'password must be shorter than or equal to 255 characters',
            'password must be a string',
          ],
        });
      }
    });

    it('should create a company', async () => {
      let output = await useCase.execute({
        name: 'insert 3',
        email: 'mail@mail.com',
        password: 'abc@123',
      });
      let entity = await repository.findById(output.id);
      expect(output).toStrictEqual({
        id: entity.id,
        name: 'insert 3',
        email: 'mail@mail.com',
        password: entity.password,
        avatar: null,
        is_active: true,
        createdAt: entity.created_at,
      });

      output = await useCase.execute({
        name: 'insert 3',
        email: 'mail@mail.com',
        password: 'abc@123',
        is_active: false,
      });
      entity = await repository.findById(output.id);
      expect(output).toStrictEqual({
        id: entity.id,
        name: 'insert 3',
        email: 'mail@mail.com',
        password: entity.password,
        is_active: false,
        avatar: null,
      });
    });
  });
});
