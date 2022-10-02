import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { EnvConstants } from './_Common/Constants/EnvConstants';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    MongooseModule.forRoot(EnvConstants.MONGODB_LINK),
    UserModule,
    ProfileModule,
    AuthModule,
    RoleModule,
  ],
})
export class AppModule {}
