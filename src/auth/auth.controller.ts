import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  UseInterceptors,
  Res,
  Req,
  UseFilters, Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JWTRefreshGuard } from '../_Common/Guards/jwt-refresh.guard';
import { RequestValidationPipe } from '../_Common/Pipes/RequestValidation.pipe';
import { registerRequestData } from './dto/req-registration.dto';
import { AuthInterceptor } from './interceptors/login.interceptor';
import { Response } from 'express';
import { EnvConstants } from '../_Common/Constants/EnvConstants';
import { HttpExceptionFilter } from '../_Common/Exceptions/HttpExceptionFilter';
import { JWTAccessGuard } from '../_Common/Guards/jwt-access.guard';
import { LoginRequestData } from './dto/req-login.dto';
import { DUser } from '../_Common/Decorators/user.decorator';
import { DToken } from '../_Common/Decorators/token.decorator';

@UseInterceptors(AuthInterceptor)
@UsePipes(RequestValidationPipe)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/ophui')
  async ophui() {
    return ({messageForOP: 'sup b - 274403254'});
  }

  @Post('/registration')
  async registration(@Res({passthrough: true}) res: Response, @Body() body: registerRequestData) {
    const {refreshToken, accessToken} = await this.authService.registration({login: body.login, password: body.password});
    res.cookie(EnvConstants.JWT_ACCESS_COOKIE, accessToken, {httpOnly: true});
    res.cookie(EnvConstants.JWT_REFRESH_COOKIE, refreshToken, {httpOnly: true});
    return null;
  }

  @Post('/login')
  async login(@Res({passthrough: true}) res: Response, @Body() body: LoginRequestData) {
    const {refreshToken, accessToken} = await this.authService.login({login: body.login, password: body.password});
    res.cookie(EnvConstants.JWT_ACCESS_COOKIE, accessToken, {httpOnly: true});
    res.cookie(EnvConstants.JWT_REFRESH_COOKIE, refreshToken, {httpOnly: true});
    return null;
  }

  @UseGuards(JWTRefreshGuard)
  @Post('/refresh')
  async refresh(@Res({passthrough: true}) res: Response, @DUser() user, @DToken() token) {
    const {refreshToken, accessToken} = await this.authService.refresh(user, token)
    res.cookie(EnvConstants.JWT_ACCESS_COOKIE, accessToken, {httpOnly: true});
    res.cookie(EnvConstants.JWT_REFRESH_COOKIE, refreshToken, {httpOnly: true});
    return null;
  }

  @UseGuards(JWTAccessGuard)
  @Post('/logout')
  logout(@Res({passthrough: true}) res: Response) {
    res.clearCookie(EnvConstants.JWT_ACCESS_COOKIE);
    res.clearCookie(EnvConstants.JWT_REFRESH_COOKIE);
    return null;
  }
}
