import { Types } from 'mongoose';

export class CreateUserDto {
  login: string;
  passwordHash: string;
}