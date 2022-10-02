import { Body, Controller, Get, Param, Post, UseFilters, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { JWTAccessGuard } from '../_Common/Guards/jwt-access.guard';
import { DUser } from '../_Common/Decorators/user.decorator';
import { CreateRoleReq } from './dto/create-role.req';
import { RoleService } from './role.service';
import { HttpExceptionFilter } from '../_Common/Exceptions/HttpExceptionFilter';
import { RequestValidationPipe } from '../_Common/Pipes/RequestValidation.pipe';
import { BaseInterceptor } from '../_Common/Interceptors/BaseInterceptor';

@UsePipes(RequestValidationPipe)
@UseInterceptors(BaseInterceptor)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(JWTAccessGuard)
  @Post()
  createRole(@DUser() user, @Body() body: CreateRoleReq) {
    return this.roleService.createRole(user, {...body, appendMe: false})
  }

  @UseGuards(JWTAccessGuard)
  @Get()
  getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @UseGuards(JWTAccessGuard)
  @Get('/:roleName')
  getRole(@Param('roleName') roleName: string) {
    return this.roleService.getRoleByName(roleName);
  }

  @Get('users/:roleName')
  getUsers(@Param('roleName') roleName: string) {
    return this.roleService.getRoleUsers(roleName);
  }
}
