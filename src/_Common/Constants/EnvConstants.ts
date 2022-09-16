import * as dotenv from "dotenv";

dotenv.config()

export const EnvConstants = {
  SERVER_PORT: process.env.SERVER_PORT || 3500,
  MONGODB_LINK: process.env.MONGODB_LINK || '*** Эй, я же не могу создать базу данных за тебя :0 ***',
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'SECRET_AT',
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES || '3h',
  JWT_ACCESS_COOKIE: process.env.JWT_ACCESS_COOKIE || 'AccessToken',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'SECRET_RT',
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES || '15d',
  JWT_REFRESH_COOKIE: process.env.JWT_REFRESH_COOKIE || 'RefreshToken',
}