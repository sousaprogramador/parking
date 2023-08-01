import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  Put,
  HttpCode,
  Query,
  ValidationPipe,
  UsePipes,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ListUsersUseCase } from '@/user/application/use-cases';
@Controller('users')
export class UserController {
  @Inject(ListUsersUseCase.UseCase)
  private listUseCase: ListUsersUseCase.UseCase;

  @Get()
  async search(@Query() searchParams: {}) {
    const output = await this.listUseCase.execute(searchParams);
    return output;
  }
}
