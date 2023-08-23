import { User, UserRepository } from '../../domain';
import { UserOutput, UserOutputMapper } from '../dto';
import { UseCase as DefaultUseCase } from '../../../common';

export namespace CreateUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepo: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = new User(input);
      await this.userRepo.insert(entity);
      return UserOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Output = UserOutput;
}

export default CreateUserUseCase;
