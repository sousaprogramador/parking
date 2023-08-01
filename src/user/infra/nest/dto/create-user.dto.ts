import { IsDate, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

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
