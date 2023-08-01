import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../database/database.module';
import { USER_PROVIDERS } from './user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    USER_PROVIDERS.REPOSITORIES.USER_TYPEORM_REPOSITORY,
    ...Object.values(USER_PROVIDERS.USE_CASES),
  ],
})
export class UserModule {}
