import UpdateUserUseCase from '../update-user.use-case';
import { UserInMemoryRepository } from '../../../infra/db';
import { User } from '../../../domain';
import { EntityValidationError, NotFoundError } from '../../../../common';

describe('UpdateUserUseCase Unit Tests', () => {
  let useCase: UpdateUserUseCase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new UpdateUserUseCase.UseCase(repository);
    jest.restoreAllMocks();
  });

  describe('execute method', () => {
    it('should throws error when entity not found', async () => {
      await expect(() =>
        useCase.execute({ id: 'fake id', name: 'fake', type: 'fake' } as any),
      ).rejects.toThrow(new NotFoundError(`Entity Not Found using ID fake id`));
    });

    it('should throw an entity validation error', async () => {
      const user = User.fake().aUser().build();
      await repository.insert(user);
      const expectedError = new EntityValidationError({
        name: ['is required'],
        email: ['is required'],
      });
      jest.spyOn(User, 'validate').mockImplementation(() => {
        throw expectedError;
      });
    });

    it('should update a user', async () => {
      const spyUpdate = jest.spyOn(repository, 'update');
      const entity = User.fake().aUser().build();
      repository.items = [entity];

      let output = await useCase.execute({
        id: entity.id,
        name: 'some company name',
        email: 'mail@mail.com',
        password: 'abc@123',
      });
      expect(spyUpdate).toHaveBeenCalledTimes(1);
      expect(output).toStrictEqual({
        id: entity.id,
        name: 'some company name',
        email: 'mail@mail.com',
        password: entity.password,
        is_active: true,
        avatar: null,
        created_at: entity.created_at,
      });

      type Arrange = {
        input: {
          id: string;
          name: string;
          email: string;
          password: string;
        };
        expected: {
          id: string;
          name: string;
          email: string;
          password: string;
          is_active: boolean;
          avatar: string | null;
          created_at: Date;
        };
      };
      const arrange: Arrange[] = [
        {
          input: {
            id: entity.id,
            name: 'some company name',
            email: 'mail@mail.com',
            password: 'abc123',
          },
          expected: {
            id: entity.id,
            name: 'some company name',
            email: 'mail@mail.com',
            password: entity.password,
            is_active: entity.is_active,
            avatar: entity.avatar,
            created_at: entity.created_at,
          },
        },
      ];

      for (const i of arrange) {
        output = await useCase.execute({
          id: i.input.id,
          name: i.input.name,
          email: i.input.email,
          password: i.input.password,
        });
        expect(output).toStrictEqual({
          id: i.expected.id,
          name: i.expected.name,
          email: i.expected.email,
          password: i.expected.password,
          is_active: i.expected.is_active,
          avatar: i.expected.avatar,
          created_at: i.expected.created_at,
        });
      }
    });
  });
});
