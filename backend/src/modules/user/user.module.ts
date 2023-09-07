import { Module } from '@nestjs/common';
import { UserEntity, UserSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './services/user.service';
import ListController from './use-cases/get-list/list.controller';
import CreateController from './use-cases/create/create.controller';
import DetailController from './use-cases/detail/detail.controller';
import UpdateController from './use-cases/update/update.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
  ],
  controllers: [
    ListController,
    CreateController,
    DetailController,
    UpdateController,
  ],
  providers: [UserService],
})
export class UserModule {}
