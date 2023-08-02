import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import {
  UserRepository as UserRepositoryContract,
  User,
  UserId,
} from '../../domain';
import { UserModelMapper } from './user-mapper';
import { NotFoundError } from '../../../common';

export class UserRepository implements UserRepositoryContract.Repository {
  sortableFields: string[] = ['name', 'email'];

  constructor(private userModel: Repository<UserEntity>) {}

  search(
    props: UserRepositoryContract.SearchParams,
  ): Promise<UserRepositoryContract.SearchResult> {
    throw new Error('Method not implemented.');
  }

  insert(entity: User): Promise<void> {
    throw new Error('Method not implemented.');
  }

  bulkInsert(entities: User[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string | UserId): Promise<User> {
    const _id = `${id}`;
    const model = await this._get(_id);
    return UserModelMapper.toEntity(model);
  }

  async findAll(): Promise<any> {
    return await this.userModel.find();
  }

  async update(entity: User): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string | UserId): Promise<void> {
    await this.userModel.softDelete({ id: `${id}` });
  }

  private async _get(id: string): Promise<UserEntity> {
    try {
      const user = await this.userModel.findOneByOrFail({ id: `${id}` });
      return user;
    } catch (error) {
      throw new NotFoundError(`Entity Not Found using ID ${id}`);
    }
  }
}
