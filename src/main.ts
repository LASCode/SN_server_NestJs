import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function startServer() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.SERVER_PORT || 3000;
  await app.listen(port, () =>
    console.log(`Сервер запущен на localhost:${port}`),
  );
}
startServer();
