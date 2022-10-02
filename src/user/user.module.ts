import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { RoleModule } from '../role/role.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    RoleModule,
  ],
  exports: [UserService],
})
export class UserModule {}
