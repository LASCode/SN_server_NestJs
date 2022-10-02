import { Body, Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { BaseInterceptor } from '../_Common/Interceptors/BaseInterceptor';

@UseInterceptors(BaseInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/addRole/:userId')
  addRole(@Body() body: {name: string}, @Param('userId') userId: string) {
    return this.userService.addRole(userId, body.name);
  }
}
