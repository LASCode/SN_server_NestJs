import { ObjectId } from 'mongoose';

export class CreateProfileDto {
  owner: ObjectId;
  sub: string;
  firstName: string;
  lastName: string;
  subName: string;
  bio: string;
}
