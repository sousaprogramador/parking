import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../db';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const createUser = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(createUser);
    createUser.password = undefined;
    return createUser;
  }
}
