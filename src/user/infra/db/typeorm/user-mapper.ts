import { UserEntity } from './entities/user.entity';
import { User } from '@/user/domain';
import { EntityValidationError, LoadEntityError } from '@/@seedwork/domain';
import UniqueEntityId from '@/@seedwork/domain/value-objects/unique-entity-id.vo';

export class UserModelMapper {
  static toEntity(model: UserEntity) {
    const { id, ...otherData } = model;
    try {
      return new User(otherData, new UniqueEntityId(id));
    } catch (e) {
      if (e instanceof EntityValidationError) {
        throw new LoadEntityError(e.error);
      }

      throw e;
    }
  }
}
