import { Repository, Like } from 'typeorm';
import { UserEntity } from './user.entity';
import {
  UserRepository as UserRepositoryContract,
  User,
  UserId,
} from '../../../domain';
import { UserModelMapper } from './user-mapper';
import { NotFoundError } from '../../../../common';

export class UserTypeOrmRepository
  implements UserRepositoryContract.Repository
{
  sortableFields: string[] = ['name', 'email'];

  constructor(private userModel: Repository<UserEntity>) {}
  //UserRepositoryContract.SearchResult
  async search(props: UserRepositoryContract.SearchParams): Promise<any> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const columnFilters = {};

    if (props.filter && (props.filter.name || props.filter.email)) {
      if (props.filter.name) {
        columnFilters['name'] = `%${props.filter.name}%`;
      }

      if (props.filter.email) {
        columnFilters['email'] = `%${props.filter.email}%`;
      }
    }

    const where = {};
    for (const i in columnFilters) {
      where[i] = Like(`%${columnFilters[i]}%`);
    }

    const [models, count] = await this.userModel.findAndCount({
      where,
      ...(props.sort && this.sortableFields.includes(props.sort)
        ? { order: { [props.sort]: `${props.sort_dir}` } }
        : { order: { created_at: 'DESC' } }),
      skip: offset,
      take: limit,
    });

    return new UserRepositoryContract.SearchResult({
      items: models.map((m) => UserModelMapper.toEntity(m)),
      current_page: props.page,
      per_page: props.per_page,
      total: count,
      filter: props.filter,
      sort: props.sort,
      sort_dir: props.sort_dir,
    });
  }

  async insert(entity: User): Promise<void> {
    const user = this.userModel.create(entity.toJSON());
    await this.userModel.save(user);
  }

  async bulkInsert(entities: User[]): Promise<void> {
    const user = this.userModel.create(entities.map((e) => e.toJSON()));
    await this.userModel.save(user);
  }

  async findById(id: string | UserId): Promise<User> {
    const _id = `${id}`;
    const model = await this._get(_id);
    return UserModelMapper.toEntity(model);
  }

  async findAll(): Promise<User[]> {
    const models = await this.userModel.find();
    return models.map((m) => UserModelMapper.toEntity(m));
  }

  async update(entity: User): Promise<void> {
    await this._get(entity.id);
    const users = await this.userModel.preload({
      id: entity.id,
      ...entity.toJSON(),
    });
    await this.userModel.save(users);
  }

  async delete(id: string | UserId): Promise<void> {
    await this._get(`${id}`);
    await this.userModel.delete({ id: `${id}` });
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
