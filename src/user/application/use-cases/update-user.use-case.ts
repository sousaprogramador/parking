import UserRepository from '../../domain/repository/user.repository';
import { UserOutput, UserOutputMapper } from '../dto/user-output';
import { default as DefaultUseCase } from '../../../@seedwork/application/use-cases';

export namespace UpdateUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepo: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.userRepo.findById(input.id);
      entity.update(input);
      await this.userRepo.update(entity);
      return UserOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar?: string;
    is_active?: boolean;
  };

  export type Output = UserOutput;
}

export default UpdateUserUseCase;
