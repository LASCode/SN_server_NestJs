import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../user/schema/user.schema';

@Schema({timestamps: true})
export class Role {
  @Prop({required: true, unique: true})
  name: string;

  @Prop({required: true})
  description: string;

  @Prop({required: true, type: Types.ObjectId, ref: 'User'})
  createdBy: User;

  @Prop({required: true, type: [{type: Types.ObjectId, ref: 'User'}]})
  users: User[];
}

export type RoleDocument = Role & Document;
export const RoleSchema = SchemaFactory.createForClass(Role);