import { ObjectId } from 'mongoose';

export class IAuthTokens {
  accessToken: string;
  refreshToken: string;
}
export interface JWTPayload {
  id: ObjectId,
  roles: string[],
  login: string,
  iat: number,
  exp: number,
}