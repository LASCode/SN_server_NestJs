import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile, ProfileDocument } from './schema/profile.schema';
import { Model } from 'mongoose';
import { v4 } from 'uuid';
import { CreateProfileReq } from './dto/create-profile.req';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UserDocument } from '../user/schema/user.schema';
import { CustomHttpException } from '../_Common/Exceptions/CustomHttpException';
import { withTransaction } from '../_Common/Utils/withTransaction';
import { EntityRepository } from '../_Common/EntityRepository/EntityRepository';
import { UserService } from '../user/user.service';

@Injectable()
export class ProfileService extends EntityRepository<ProfileDocument, Profile> {
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<ProfileDocument>,
    private readonly userService: UserService,
  ) {super(profileModel)}

  async createProfile(userData: UserDocument, profileData: CreateProfileReq): Promise<ProfileDocument> {
    const session = await this.startSession();
    const result = await withTransaction<ProfileDocument>(session, async () => {
      if (userData.profile) throw new CustomHttpException('Профиль уже был создан ранее', HttpStatus.BAD_REQUEST);
      const newProfilePayload: CreateProfileDto = {
        sub: v4(),
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
        subName: profileData.subName || '',
        bio: profileData.bio || '',
        owner: userData._id,
      };
      const newProfile = await this.create(newProfilePayload, {session});
      await this.userService.update({_id: userData._id}, {profile: newProfile._id}, {session});
      return newProfile;
    })
    await session.endSession();
    return result;
  }
  async getMyProfile(userData: UserDocument): Promise<ProfileDocument | undefined> {
    if (!userData.profile) throw new CustomHttpException('Профиль не существует', HttpStatus.BAD_REQUEST);
    const profile = await this.findById(userData.profile);
    if (!profile) throw new CustomHttpException('Профиль не существует или был удален', HttpStatus.BAD_REQUEST);
    return profile;
  }
  async getProfileBySub(sub: string): Promise<ProfileDocument | undefined> {
    const profile = await this.findOne({sub: sub});
    if (!profile) throw new CustomHttpException('Профиль c таким идентификатором не найден', HttpStatus.BAD_REQUEST)
    return profile;
  }
}
