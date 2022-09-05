import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true, default: Types.ObjectId })
  _customId: string;

  @Prop({ required: false, default: null })
  _tokenHash: string | null;

  @Prop({ required: true })
  _passwordHash: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  login: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
