import { UpdateUserUseCase } from '../../../application';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto
  extends CreateUserDto
  implements Omit<UpdateUserUseCase.Input, 'id'> {}
