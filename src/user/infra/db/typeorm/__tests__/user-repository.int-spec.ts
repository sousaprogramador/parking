import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { UserTypeOrmRepository } from '../user.repository';
import { UserEntity } from '../user.entity';
import { User, UserId } from '../../../domain';
import { NotFoundError } from '../../../../common';
import { databaseProviders } from '../../../../database/database.providers';
import { UserRepository } from '../../../domain';

describe('UserSequelizeRepository Unit Tests', () => {
  let repository: UserTypeOrmRepository;
  let dataSource: DataSource;

  beforeAll(async () => {
    dataSource = await databaseProviders[0].useFactory();
    repository = new UserTypeOrmRepository(
      dataSource.getRepository(UserEntity),
    );
  });

  beforeEach(async () => {
    await dataSource.synchronize();
    await dataSource.getRepository(UserEntity).clear();
  });

  it('should inserts a new entity', async () => {
    let user = new User({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    await repository.insert(user);
    let entity = await repository.findById(user.id);
    expect(entity.toJSON()).toStrictEqual(user.toJSON());

    user = new User({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      is_active: false,
    });
    await repository.insert(user);
    entity = await repository.findById(user.id);
    expect(entity.toJSON()).toStrictEqual(user.toJSON());
  });

  it('should throws error when entity not found', async () => {
    await expect(repository.findById('fake id')).rejects.toThrow(
      new NotFoundError('Entity Not Found using ID fake id'),
    );

    await expect(
      repository.findById(new UserId('9366b7dc-2d71-4799-b91c-c64adb205104')),
    ).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found using ID 9366b7dc-2d71-4799-b91c-c64adb205104`,
      ),
    );
  });

  it('should finds a entity by id', async () => {
    const entity = new User({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      is_active: false,
    });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

    entityFound = await repository.findById(entity.entityId);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it('should return all users', async () => {
    const entity = new User({
      name: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      is_active: false,
      created_at: new Date(),
    });
    await repository.insert(entity);
    const entities = await repository.findAll();
    expect(entities).toHaveLength(1);
    expect(JSON.stringify(entities)).toBe(JSON.stringify([entity]));
  });

  it('should throw error on update when a entity not found', async () => {
    const entity = new User({
      name: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      is_active: false,
      created_at: new Date(),
    });
    await expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID ${entity.id}`),
    );
  });

  it('should update a entity', async () => {
    const entity = new User({
      name: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      is_active: false,
      created_at: new Date(),
    });
    await repository.insert(entity);

    entity.update({
      name: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      is_active: true,
      created_at: new Date(),
    });
    await repository.update(entity);

    const entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it('should throw error on delete when a entity not found', async () => {
    await expect(repository.delete('fake id')).rejects.toThrow(
      new NotFoundError('Entity Not Found using ID fake id'),
    );

    await expect(
      repository.delete(new UserId('9366b7dc-2d71-4799-b91c-c64adb205104')),
    ).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found using ID 9366b7dc-2d71-4799-b91c-c64adb205104`,
      ),
    );
  });

  it('should delete a entity', async () => {
    const entity = new User({
      name: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      is_active: true,
      created_at: new Date(),
    });
    await repository.insert(entity);

    await repository.delete(entity.id);

    await expect(repository.findById(entity.id)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID ${entity.id}`),
    );
  });

  it('should apply paginate and filter', async () => {
    const users = [
      User.fake()
        .aUser()
        .withName('test')
        .withCreatedAt(new Date(new Date().getTime() + 5000))
        .build(),
      User.fake()
        .aUser()
        .withName('a')
        .withCreatedAt(new Date(new Date().getTime() + 4000))
        .build(),
      User.fake()
        .aUser()
        .withName('TEST')
        .withCreatedAt(new Date(new Date().getTime() + 3000))
        .build(),
      User.fake()
        .aUser()
        .withName('TeSt')
        .withCreatedAt(new Date(new Date().getTime() + 1000))
        .build(),
    ];

    await repository.bulkInsert(users);

    let searchOutput = await repository.search(
      UserRepository.SearchParams.create({
        page: 1,
        per_page: 2,
        filter: { name: 'TEST' },
      }),
    );

    console.log('searchOutput', searchOutput);
    expect(searchOutput.toJSON(true)).toMatchObject(
      new UserRepository.SearchResult({
        items: [users[0], users[2]],
        total: 3,
        current_page: 1,
        per_page: 2,
        sort: null,
        sort_dir: null,
        filter: { name: 'TEST' },
      }).toJSON(true),
    );

    searchOutput = await repository.search(
      UserRepository.SearchParams.create({
        page: 2,
        per_page: 2,
        filter: { name: 'TEST' },
      }),
    );
    expect(searchOutput.toJSON(true)).toMatchObject(
      new UserRepository.SearchResult({
        items: [users[3]],
        total: 3,
        current_page: 2,
        per_page: 2,
        sort: null,
        sort_dir: null,
        filter: { name: 'TEST' },
      }).toJSON(true),
    );
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
});
