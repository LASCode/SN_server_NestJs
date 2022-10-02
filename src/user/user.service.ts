import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomHttpException } from '../_Common/Exceptions/CustomHttpException';
import { ErrorMsgConst } from '../_Common/Constants/ErrorMsgConst';
import { EntityRepository } from '../_Common/EntityRepository/EntityRepository';
import { User, UserDocument } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService extends EntityRepository<UserDocument, User> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly roleService: RoleService,
  ) {super(userModel)}

  async addRole(_id: string, roleName: string) {
    const candidate = await this.findById(_id);
    if (!candidate) throw new CustomHttpException(ErrorMsgConst.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    const userRole = await this.roleService.getRoleByName(roleName);
    if (!userRole) throw new CustomHttpException(ErrorMsgConst.ROLE_NAME_NOT_FOUND, HttpStatus.BAD_REQUEST);
    candidate.roles.push(userRole._id);
    userRole.users.push(candidate._id);
    await candidate.save();
    await userRole.save();
    // return ({f: 1})
  }
}
