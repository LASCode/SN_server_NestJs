import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { withTransaction } from '../_Common/Utils/withTransaction';
import { CustomHttpException } from '../_Common/Exceptions/CustomHttpException';
import { Role, RoleDocument } from './schema/role.schema';
import { UserDocument } from '../user/schema/user.schema';
import { EntityRepository } from '../_Common/EntityRepository/EntityRepository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorMsgConst } from '../_Common/Constants/ErrorMsgConst';

@Injectable()
export class RoleService  extends EntityRepository<RoleDocument, Role> {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>
  ) {super(roleModel)}

  async createRole(userData: UserDocument, createRoleDto: CreateRoleDto): Promise<RoleDocument> {
    const session = await this.startSession();
    const result = await withTransaction<RoleDocument>(session, async () => {
      const roleHasAlreadyCreated = await this.findOne({name: createRoleDto.name});
      if (roleHasAlreadyCreated) throw new CustomHttpException('Роль с таким названием уже существует', HttpStatus.BAD_REQUEST);
      const newRolePayload: Role = {
        name: createRoleDto.name,
        description: createRoleDto.description,
        createdBy: userData._id,
        users: [],
      }
      return await this.create(newRolePayload, { session });
    })
    await session.endSession();
    return result;
  }
  async getAllRoles(): Promise<RoleDocument[]> {
    return this.findMany({});
  }
  async getRoleByName(name: string): Promise<RoleDocument | undefined> {
    const role = await this.findOne({name: name});
    if (!role) throw new CustomHttpException('Такой роли не существует', HttpStatus.BAD_REQUEST);
    return role;
  }
  async getRoleUsers(roleName: string) {
    const role = await this.findOne({name: roleName});
    if (!role) throw new CustomHttpException(ErrorMsgConst.ROLE_NAME_NOT_FOUND, HttpStatus.BAD_REQUEST);
    const roleObjWithUsers = await role.populate('users');
    return roleObjWithUsers.users;
  }
}
