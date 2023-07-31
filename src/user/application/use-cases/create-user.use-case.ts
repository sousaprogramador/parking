import { User } from '../../domain/entities';
import UserRepository from '../../domain/repository/user.repository';
import * as bcrypt from 'bcryptjs';
import { UserOutput, UserOutputMapper } from '../dto/user-output';
import { default as DefaultUseCase } from '../../../@seedwork/application/use-cases';

export namespace CreateUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepo: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const password = await bcrypt.hash(input.password, 10);
      const entity = new User({
        ...input,
        password: password,
      });
      await this.userRepo.insert(entity);
      return UserOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    is_active?: boolean;
  };

  export type Output = UserOutput;
}
export default CreateUserUseCase;
