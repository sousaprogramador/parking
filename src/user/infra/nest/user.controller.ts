import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserEntity } from '../typeorm/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async show(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(createUserDto);
  }
}
