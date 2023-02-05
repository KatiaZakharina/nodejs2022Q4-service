import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserStore } from './users.storage';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserStore],
})
export class UsersModule {}
