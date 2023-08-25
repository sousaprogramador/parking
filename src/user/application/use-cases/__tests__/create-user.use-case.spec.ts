import CreateUserUseCase from '../create-user.use-case';
import { UserInMemoryRepository } from '../../../infra/db';
import { User } from '../../../domain';
import { EntityValidationError } from '../../../../common';

describe('CreateUserUseCase Unit Tests', () => {
  let useCase: CreateUserUseCase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new CreateUserUseCase.UseCase(repository);
    jest.restoreAllMocks();
  });

  describe('execute method', () => {
    it('should throw an entity validation error', async () => {
      const expectedError = new EntityValidationError({
        name: ['is required'],
        email: ['is required'],
      });
      jest.spyOn(User, 'validate').mockImplementation(() => {
        throw expectedError;
      });
      await expect(
        useCase.execute({
          name: 'some company name',
          email: 'mail@basic.com',
          password: 'some',
        }),
      ).rejects.toThrowError(expectedError);
    });

    it('should create a user', async () => {
      const spyInsert = jest.spyOn(repository, 'insert');
      let output = await useCase.execute({
        name: 'some company name',
        email: 'mail@basic.com',
        password: 'some',
      });
      expect(spyInsert).toHaveBeenCalledTimes(1);
      expect(output).toStrictEqual({
        id: repository.items[0].id,
        name: 'some company name',
        email: 'mail@basic.com',
        password: repository.items[0].password,
        is_active: true,
        avatar: null,
        created_at: repository.items[0].created_at,
      });

      output = await useCase.execute({
        name: 'some company name',
        email: 'mail@basic.com',
        password: 'some',
      });
      expect(spyInsert).toHaveBeenCalledTimes(2);
      expect(output).toStrictEqual({
        id: repository.items[1].id,
        name: 'some company name',
        email: 'mail@basic.com',
        password: repository.items[1].password,
        is_active: true,
        avatar: null,
        created_at: repository.items[1].created_at,
      });
    });
  });
});
