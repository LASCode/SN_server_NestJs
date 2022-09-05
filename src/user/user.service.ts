import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async getAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }
  async getById(_id: ObjectId): Promise<UserDocument | undefined> {
    return this.userModel.findOne({'_id': _id});
  }
  async getByCustomId(_customId: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({'_customId': _customId});
  }
  async getByLogin(login: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({'login': login});
  }

  async create(userDto: CreateUserDto): Promise<UserDocument> {
    const payload = {...userDto}
    const newUser = new this.userModel(payload);
    return newUser.save();
  }
  async remove(_id: ObjectId): Promise<UserDocument> {
    return this.userModel.findOneAndRemove({ '_id': _id });
  }
  async update(_id: ObjectId, payload: Partial<User>): Promise<UserDocument> {
    return this.userModel.findOneAndUpdate({'_id': _id}, payload);
  }
}
