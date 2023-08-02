/* eslint-disable @typescript-eslint/no-namespace */
import { UserRepository } from '../../domain';
import { UserOutput, UserOutputMapper } from '../dto/user-output';
import { UseCase as DefaultUseCase } from '../../../common';

export namespace GetUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepo: UserRepository.Repository) {}

    async execute(input: Input): Promise<any> {
      const entity = await this.userRepo.findById(input.id);
      return UserOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = UserOutput;
}
export default GetUserUseCase;
