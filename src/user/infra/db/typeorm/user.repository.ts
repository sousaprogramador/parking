import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserModelMapper } from './user-mapper';
import {
  UserRepository as UserRepositoryContract,
  User,
  UserId,
} from '../../../domain';
import { SortDirection, NotFoundError } from '@/@seedwork/domain';

export class UserRepository implements UserRepositoryContract.Repository {
  sortableFields: string[] = ['name', 'email'];

  /*orderBy = {
    mysql: {
      name: (sort_dir: SortDirection) =>
        literal(`binary description ${sort_dir}`),
    },
  };*/
  constructor(private userModel: Repository<UserEntity>) {}

  bulkInsert(entities: User[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  update(entity: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | UserId): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async search(props: UserRepositoryContract.SearchParams): Promise<any> {
    //UserRepositoryContract.SearchResult
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const where = {};

    if (props.filter && (props.filter.name || props.filter.name)) {
      if (props.filter.name) {
        where['name'] = { Like: `%${props.filter.name}%` };
      }

      if (props.filter.email) {
        where['email'] = { Like: `%${props.filter.email}%` };
      }
    }

    const [models, count] = await this.userModel.findAndCountBy({});

    /*return new UserRepositoryContract.SearchResult({
      items: models.map((m) => UserModelMapper.toEntity(m)),
      current_page: props.page,
      per_page: props.per_page,
      total: count,
      filter: props.filter,
      sort: props.sort,
      sort_dir: props.sort_dir,
    });*/
  }

  async insert(entity: User): Promise<void> {
    const user = this.userModel.create(entity.toJSON());
    console.log('insert', user);
    await this.userModel.save(user);
  }

  async findById(id: string | UserId): Promise<User> {
    const _id = `${id}`;
    const model = await this._get(_id);
    return UserModelMapper.toEntity(model);
  }

  private async _get(id: string): Promise<UserEntity> {
    return this.userModel.findOneByOrFail({ id: id });
  }

  /*async bulkInsert(entities: Company[]): Promise<void> {
    await this.companyModel.bulkCreate(entities.map((e) => e.toJSON()));
  }

  

  async findAll(): Promise<Company[]> {
    const models = await this.companyModel.findAll();
    return models.map((m) => CompanyModelMapper.toEntity(m));
  }

  async update(entity: Company): Promise<void> {
    await this._get(entity.id);
    await this.companyModel.update(entity.toJSON(), {
      where: { id: entity.id },
    });
  }

  async delete(id: string | CompanyId): Promise<void> {
    const _id = `${id}`;
    await this._get(_id);
    this.companyModel.destroy({ where: { id: _id } });
  }

  

  private formatSort(sort: string, sort_dir: SortDirection) {
    const dialect = this.companyModel.sequelize.getDialect();
    if (this.orderBy[dialect] && this.orderBy[dialect][sort]) {
      return this.orderBy[dialect][sort](sort_dir);
    }
    return [[sort, sort_dir]];
  }*/
}
