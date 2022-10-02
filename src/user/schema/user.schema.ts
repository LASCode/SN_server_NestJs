import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Profile } from '../../profile/schema/profile.schema';
import { Role } from '../../role/schema/role.schema';

@Schema({timestamps: true})
export class User {
  @Prop({required: true, unique: true})
  login: string;
  @Prop({required: false, default: null})
  tokenHash: string | null;
  @Prop({required: true})
  passwordHash: string;
  @Prop({required: false, type: Types.ObjectId, ref: 'Profile', default: null})
  profile: Profile | null;
  @Prop({required: true, type: [{type: Types.ObjectId, ref: 'Role'}]})
  roles: Role[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);