import { ProfileDocument } from '../schema/profile.schema';
import { Expose } from 'class-transformer';


export class ProfileOwnerRes implements Partial<ProfileDocument> {
  @Expose()
  sub: string;
  @Expose()
  firstName: string;
  @Expose()
  lastName: string;
  @Expose()
  subName: string;
  @Expose()
  bio: string;
  @Expose()
  posts: [];
  @Expose()
  friends: []
  @Expose()
  friendsRequest: []
  @Expose()
  subscribers: []
  @Expose()
  createdAt: Date;
}