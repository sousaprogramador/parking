import { UserRepository } from '../../domain';
import { UserOutput, UserOutputMapper } from '../dto';
import { UseCase as DefaultUseCase } from '../../../common';

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
    is_active?: boolean;
    avatar?: string | null;
  };

  export type Output = UserOutput;
}

export default UpdateUserUseCase;
