import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JWTRefreshGuard } from '../_Common/Guards/jwt-refresh.guard';
import { RequestValidationPipe } from '../_Common/Pipes/RequestValidation.pipe';
import { registerRequestData } from './dto/req-registration.dto';
import { AuthInterceptor } from './interceptors/login.interceptor';
import { Response } from 'express';
import { JWTAccessGuard } from '../_Common/Guards/jwt-access.guard';
import { LoginRequestData } from './dto/req-login.dto';
import { DUser } from '../_Common/Decorators/user.decorator';
import { DToken } from '../_Common/Decorators/token.decorator';

@UseInterceptors(AuthInterceptor)
@UsePipes(RequestValidationPipe)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  async registration(@Res({passthrough: true}) res: Response, @Body() body: registerRequestData) {
    const {refreshToken, accessToken} = await this.authService.registration({login: body.login, password: body.password});
    return ({refreshToken, accessToken});
  }

  @Post('/login')
  async login(@Res({passthrough: true}) res: Response, @Body() body: LoginRequestData) {
    const {refreshToken, accessToken} = await this.authService.login({login: body.login, password: body.password});
    return ({refreshToken, accessToken});
  }

  @UseGuards(JWTRefreshGuard)
  @Post('/refresh')
  async refresh(@Res({passthrough: true}) res: Response, @DUser() user, @DToken() token) {
    const {refreshToken, accessToken} = await this.authService.refresh(user, token)
    return ({refreshToken, accessToken});
  }

  @UseGuards(JWTAccessGuard)
  @Post('/logout')
  logout(@Res({passthrough: true}) res: Response) {
    return null;
  }
}
