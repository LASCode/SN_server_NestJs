import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  UsePipes,
  UseFilters,
  UseInterceptors,
  Get,
  Req, Param, SerializeOptions,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JWTAccessGuard } from '../_Common/Guards/jwt-access.guard';
import { CreateProfileReq } from './dto/create-profile.req';
import { RequestValidationPipe } from '../_Common/Pipes/RequestValidation.pipe';
import { HttpExceptionFilter } from '../_Common/Exceptions/HttpExceptionFilter';
import { ProfileOwnerInterceptor } from './interceptor/profile-owner.interceptor';
import { ProfileGuard } from '../_Common/Guards/profile.guard';
import { RoleGuard } from '../_Common/Guards/role.guard';
import { Roles } from '../_Common/Decorators/role.decorator';

@UseFilters(HttpExceptionFilter)
@UsePipes(RequestValidationPipe)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseInterceptors(ProfileOwnerInterceptor)
  @Roles('Admin', 'User')
  @UseGuards(JWTAccessGuard, ProfileGuard, RoleGuard)
  @Get('/me')
  async getMyProfile(@Req() req) {
    return this.profileService.getMyProfile(req.user.user);
  }

  @UseInterceptors(ProfileOwnerInterceptor)
  @UseGuards(JWTAccessGuard)
  @Post('/me')
  createNewProfile(@Request() req, @Body() newProfileData: CreateProfileReq) {
    return this.profileService.createProfile(req.user.user, newProfileData)
  }

  @Get('/:sub')
  getProfile(@Param('sub') sub: string) {
    return this.profileService.getProfileBySub(sub);
  }
}
