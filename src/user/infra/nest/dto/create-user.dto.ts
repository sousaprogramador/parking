import { IsDate, IsBoolean, IsOptional, IsString } from 'class-validator';
import { CreateUserUseCase } from '../../../application';

export class CreateUserDto implements CreateUserUseCase.Input {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  avatar?: string | null;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsDate()
  @IsOptional()
  created_at?: Date;
}
