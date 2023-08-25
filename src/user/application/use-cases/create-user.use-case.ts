import { hash } from 'bcrypt';
import { User, UserRepository } from '../../domain';
import { UserOutput, UserOutputMapper } from '../dto';
import { UseCase as DefaultUseCase } from '../../../common';

export namespace CreateUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepo: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const password = await hash(input.password, 8);

      const entity = new User({
        ...input,
        password,
      });
      await this.userRepo.insert(entity);
      return UserOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    name: string;
    email: string;
    password: string;
    is_active?: boolean;
    avatar?: string | null;
  };

  export type Output = UserOutput;
}

export default CreateUserUseCase;
