import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './schema/profile.schema';
import { UserModule } from '../user/user.module';

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [
    MongooseModule.forFeature([{name: Profile.name, schema: ProfileSchema}]),
    UserModule,
  ],
  exports: [ProfileService]
})
export class ProfileModule {}
