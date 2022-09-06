import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { IAuthTokens } from './types/tokens';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {

  registration(userData: SignUpDto): Promise<IAuthTokens> {

  }
  login(userData: SignInDto): Promise<IAuthTokens> {}
}
