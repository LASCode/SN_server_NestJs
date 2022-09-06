import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  registration(@Body() userData: SignUpDto) {
    return this.authService.registration(userData);
  }
  @Post('/signIn')
  login(@Body() userData: SignInDto) {
    return this.authService.login(userData);
  }
}
