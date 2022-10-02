import { EnvConstants } from './_Common/Constants/EnvConstants';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './_Common/Exceptions/HttpExceptionFilter';

async function startServer() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({origin: 'http://localhost:3000', credentials: true});
  await app.listen(EnvConstants.SERVER_PORT, () =>
    console.log(`Сервер запущен на localhost:${EnvConstants.SERVER_PORT}`),
  );
}
startServer();
