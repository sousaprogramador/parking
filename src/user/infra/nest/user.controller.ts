import {
  Inject,
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserEntity } from '../typeorm/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import GetUserUseCase from '../../application/use-cases/get-user.use-case';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(GetUserUseCase.UseCase)
  private getUseCase: GetUserUseCase.UseCase;

  @Get(':id')
  async show(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  ): Promise<any> {
    return await this.getUseCase.execute({ id });
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(createUserDto);
  }
}
