import { DataSource } from 'typeorm';
import { UserEntity } from '../db';
import { ListUsersUseCase } from '@/user/application/use-cases';

export namespace USER_PROVIDERS {
  export namespace REPOSITORIES {
    export const USER_TYPEORM_REPOSITORY = {
      provide: 'UserTypeOrmRepository',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(UserEntity),
      inject: ['DATA_SOURCE'],
    };

    export const USER_REPOSITORY = {
      provide: 'UserTypeOrmRepository',
      useExisting: 'UserTypeOrmRepository',
    };
  }

  export namespace USE_CASES {
    export const LIST_USERS_USE_CASE = {
      provide: ListUsersUseCase.UseCase,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(UserEntity),
      inject: [REPOSITORIES.USER_REPOSITORY.provide],
    };
  }
}

/*export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: ['DATA_SOURCE'],
  },
];*/
