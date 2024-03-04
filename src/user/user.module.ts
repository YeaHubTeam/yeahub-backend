import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { USERS_COMMANDS } from './commands';
import { USERS_QUERIES } from './queries';
import { UserEntity } from './entities/user.entity';
import { ProfileEntity } from 'src/index.entities';

const userServiceProviderExport = {
  provide: 'UserService',
  useExisting: UserService,
};

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProfileEntity])],
  providers: [
    UserService,
    userServiceProviderExport,
    ...USERS_COMMANDS,
    ...USERS_QUERIES,
  ],
  controllers: [UserController],
  exports: [TypeOrmModule, userServiceProviderExport],
})
export class UserModule {}
