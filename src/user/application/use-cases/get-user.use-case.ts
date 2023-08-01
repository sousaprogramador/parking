/* eslint-disable @typescript-eslint/no-namespace */
import { UserRepository } from '../../domain';
import { UserOutput, UserOutputMapper } from '../dto/user-output';

export namespace GetUserUseCase {
  export class UseCase {
    constructor(private userRepo: UserRepository.Repository) {}

    async execute(): Promise<any> {
      const entity = await this.userRepo.findAll();
      return entity; //UserOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = UserOutput;
}
export default GetUserUseCase;
