import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: "*" });
  app.useGlobalPipes(new ValidationPipe()); //voir si amélioration message erreur
  await app.listen(3000);
}
bootstrap();
