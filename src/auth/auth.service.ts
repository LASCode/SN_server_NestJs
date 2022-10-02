import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../user/schema/user.schema';
import { RegistrationDto } from './dto/registration.dto';
import * as CryptoJS from 'crypto-js';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ClientSession, ObjectId } from 'mongoose';
import { IAuthTokens } from './types/tokens';
import { EnvConstants } from '../_Common/Constants/EnvConstants';
import { CustomHttpException } from '../_Common/Exceptions/CustomHttpException';
import { withTransaction } from '../_Common/Utils/withTransaction';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';
import { RoleDocument } from '../role/schema/role.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registration(userData: RegistrationDto): Promise<IAuthTokens> {
    const session = await this.userService.startSession();
    const result = await withTransaction<IAuthTokens>(session, async () => {
      const candidate: UserDocument = await this.userService.findOne({login: userData.login});
      if (candidate) throw new CustomHttpException('Пользователь уже зарегистрирован', HttpStatus.UNAUTHORIZED);
      const defaultRole: RoleDocument = await this.roleService.findOne({name: 'User'});
      if (candidate) throw new CustomHttpException('Роль User не существует.', HttpStatus.UNAUTHORIZED);
      const hashedPassword = await this.hashData(userData.password);
      const newUserPayload: CreateUserDto = {
        login: userData.login,
        passwordHash: hashedPassword,
      }
      const newUser: UserDocument = await this.userService.create(newUserPayload, {session});
      const tokens: IAuthTokens = await this.generateTokens(newUser);
      await this.updateUserTokenHash(newUser._id, tokens.refreshToken, session);
      await this.userService.update({_id: newUser._id}, {$push: {roles: defaultRole._id}}, {session});
      await this.roleService.update({_id: defaultRole._id}, {$push: {users: newUser._id}}, {session});
      return tokens;
    })
    await session.endSession();
    return result;
  }

  async login(loginDto: LoginDto): Promise<IAuthTokens> {
    const session = await this.userService.startSession();
    const result = await withTransaction<IAuthTokens>(session, async () => {
      const user = await this.checkUserData(loginDto);
      const tokens: IAuthTokens = await this.generateTokens(user);
      await this.updateUserTokenHash(user._id, tokens.refreshToken, session);
      return tokens;
    })
    await session.endSession();
    return result;
  }

  async refresh(userData: UserDocument, refreshToken: string): Promise<IAuthTokens> {
    const session = await this.userService.startSession();
    const result = await withTransaction<IAuthTokens>(session, async () => {
      const RTHashEquals = await this.checkHashData(refreshToken, userData.tokenHash);
      if (!RTHashEquals) throw new CustomHttpException('Токены не совпадают', HttpStatus.UNAUTHORIZED);
      const tokens: IAuthTokens = await this.generateTokens(userData);
      await this.updateUserTokenHash(userData._id, tokens.refreshToken, session);
      return tokens;
    })
    await session.endSession();
    return result;
  }

  async checkUserData(userData: LoginDto): Promise<UserDocument> {
    const candidate = await this.userService.findOne({login: userData.login});
    if (!candidate) throw new CustomHttpException('Пользователь не существует', HttpStatus.UNAUTHORIZED);
    const passwordEquals = await this.checkHashData(userData.password, candidate.passwordHash);
    if (!passwordEquals) throw new CustomHttpException('Неверный пароль', HttpStatus.UNAUTHORIZED);
    return candidate;
  }
  private async generateTokens(userData: UserDocument): Promise<IAuthTokens> {
    const { login, _id, roles } = await userData.populate('roles');
    const JWTPayload = { login, id: _id, roles: roles.map(el => el.name) };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(JWTPayload, {secret: EnvConstants.JWT_ACCESS_SECRET, expiresIn: EnvConstants.JWT_ACCESS_EXPIRES}),
      this.jwtService.signAsync(JWTPayload, {secret: EnvConstants.JWT_REFRESH_SECRET, expiresIn: EnvConstants.JWT_REFRESH_EXPIRES}),
    ]);
    return ({accessToken, refreshToken});
  }
  private async hashData(data: string): Promise<string> {
    return CryptoJS.SHA256(data).toString();
  }
  private async checkHashData(currentData, hashedData): Promise<boolean> {
    const hashedCurrentData = CryptoJS.SHA256(currentData).toString();
    return hashedCurrentData === hashedData;
  }
  private async updateUserTokenHash(_id: ObjectId, refreshToken: string, session: ClientSession | null = null): Promise<void> {
    const hashedToken = await this.hashData(refreshToken);
    await this.userService.update({_id: _id}, {tokenHash: hashedToken}, {session});
  }
}
