import { UserEntity } from './user.entity';
import { User } from '../../../domain';
import { EntityValidationError, LoadEntityError } from '../../../../common';
import { UniqueEntityId } from '../../../../common';

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
