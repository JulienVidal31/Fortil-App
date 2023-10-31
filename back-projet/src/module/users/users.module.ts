import { Global, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';

// @Global()
@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]),],
  controllers: [UsersController],
  providers: [UsersService],
  // exports: [UsersService]
})
export class UsersModule {}
