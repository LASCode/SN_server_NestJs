import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function startServer() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, () => console.log(`Сервер запущен на localhost:${3000}`));
}
startServer();
