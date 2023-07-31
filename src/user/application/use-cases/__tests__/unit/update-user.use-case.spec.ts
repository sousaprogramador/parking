import UpdateUserUseCase from '../../update-user.use-case';
import UserInMemoryRepository from '../../../../infra/db/in-memory/user-in-memory.repository';
import { NotFoundError } from '../../../../../@seedwork/domain';
import { User } from '../../../../domain/entities';

describe('UpdateUserUseCase Unit Tests', () => {
  let useCase: UpdateUserUseCase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new UpdateUserUseCase.UseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    await expect(() =>
      useCase.execute({
        id: 'fake id',
        name: 'fake',
        email: 'sometest@mail.com',
        password: '1234',
        is_active: false,
        avatar: null,
      }),
    ).rejects.toThrow(new NotFoundError(`Entity Not Found using ID fake id`));
  });

  it('should update a User', async () => {
    const entity = new User({
      name: 'some test',
      email: 'sometest@mail.com',
      password: '1234',
      is_active: true,
      avatar: null,
    });
    repository.items = [entity];

    let output = await useCase.execute({
      id: entity.id,
      name: 'some test',
      email: 'sometest@mail.com',
      password: '1234',
      is_active: false,
      avatar: null,
    });

    expect(output).toStrictEqual({
      id: entity.id,
      name: 'some test',
      email: 'sometest@mail.com',
      password: '1234',
      is_active: false,
      avatar: null,
      created_at: entity.created_at,
    });

    type Arrange = {
      input: {
        id: string;
        name: string;
        password: string;
        email: string;
        avatar: null | string;
        is_active?: boolean;
      };
      expected: {
        id: string;
        name: string;
        email: string;
        password: string;
        avatar: null | string;
        is_active?: boolean;
        created_at: Date;
      };
    };
    const arrange: Arrange[] = [
      {
        input: {
          id: entity.id,
          name: 'some test',
          email: 'sometest@mail.com',
          password: '1234',
          is_active: true,
          avatar: '',
        },
        expected: {
          id: entity.id,
          name: 'some test',
          email: 'sometest@mail.com',
          password: '1234',
          is_active: true,
          avatar: '',
          created_at: entity.created_at,
        },
      },
      {
        input: {
          id: entity.id,
          name: 'some test2',
          email: 'sometest@mail.com',
          password: '1234',
          is_active: false,
          avatar: 'src',
        },
        expected: {
          id: entity.id,
          name: 'some test2',
          email: 'sometest@mail.com',
          password: '1234',
          is_active: false,
          avatar: 'src',
          created_at: entity.created_at,
        },
      },
      {
        input: {
          id: entity.id,
          name: 'some test3',
          email: 'sometest@mail.com',
          password: '1234',
          is_active: true,
          avatar: 'src/img',
        },
        expected: {
          id: entity.id,
          name: 'some test3',
          email: 'sometest@mail.com',
          password: '1234',
          is_active: true,
          avatar: 'src/img',
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
        is_active: i.input.is_active,
        avatar: i.input.avatar,
      });
      expect(output).toStrictEqual({
        id: entity.id,
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
