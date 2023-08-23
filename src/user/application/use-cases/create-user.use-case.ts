import { hash } from 'bcrypt';
import { User, UserRepository } from '../../domain';
import { UserOutput, UserOutputMapper } from '../dto';
import { UseCase as DefaultUseCase } from '../../../common';
import { UserAlreadyExistsError } from '../../domain/errors/user-already-exists.error';

export namespace CreateUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepo: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const passwordHash = await hash(input.password, 8);
      const entity = new User({
        ...input,
        password: passwordHash,
      });
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
