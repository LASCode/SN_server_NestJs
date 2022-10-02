import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../user/schema/user.schema';

@Schema({timestamps: true})
export class Profile {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User'})
  owner: User;
  @Prop({ required: true, unique: true })
  sub: string;
  @Prop({ required: true, default: '' })
  firstName: string;
  @Prop({ required: true, default: '' })
  lastName: string;
  @Prop({ required: true, default: '' })
  subName: string;
  @Prop({ required: true, default: '' })
  bio: string;
  @Prop({ required: true, default: [] })
  posts: [];
  @Prop({ required: true, default: [] })
  friends: []
  @Prop({ required: true, default: [] })
  friendsRequest: []
  @Prop({ required: true, default: [] })
  subscribers: []
}

export type ProfileDocument = Profile & Document;
export const ProfileSchema = SchemaFactory.createForClass(Profile);