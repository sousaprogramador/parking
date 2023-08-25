/* eslint-disable @typescript-eslint/no-namespace */
import { DataSource } from 'typeorm';
import { UserEntity } from '../db';
import { UserRepository } from '../../domain';
import { UserTypeOrmRepository } from '../db';
import GetUserUseCase from '../../application/use-cases/get-user.use-case';

export namespace USER_PROVIDERS {
  export namespace REPOSITORIES {
    export const USER_SEQUELIZE_REPOSITORY = {
      provide: 'USER_REPOSITORY',
      useFactory: (dataSource: DataSource) => {
        return new UserTypeOrmRepository(dataSource.getRepository(UserEntity));
      },
      inject: ['DATA_SOURCE'],
    };

    export const USER_REPOSITORY = {
      provide: 'USER_REPOSITORY',
      useExisting: 'USER_REPOSITORY',
    };
  }

  export namespace USE_CASES {
    export const GET_USER_USE_CASE = {
      provide: GetUserUseCase.UseCase,
      useFactory: (userRepo: UserRepository.Repository) => {
        return new GetUserUseCase.UseCase(userRepo);
      },
      inject: [REPOSITORIES.USER_REPOSITORY.provide],
    };
  }
}
