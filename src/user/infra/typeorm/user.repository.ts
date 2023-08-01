import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import {
  UserRepository as UserRepositoryContract,
  User,
  UserId,
} from '../../domain';

export class UserRepository implements UserRepositoryContract.Repository {
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
  findById(id: string | UserId): Promise<User> {
    throw new Error('Method not implemented.');
  }
  async findAll(): Promise<any> {
    return await this.userModel.find();
  }
  update(entity: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | UserId): Promise<void> {
    throw new Error('Method not implemented.');
  }
  sortableFields: string[] = ['name', 'email'];
}
