import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';
import { AuthGuard } from './modules/auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const reflector = app.get(Reflector); // Instância do Reflector
  app.useGlobalGuards(new AuthGuard(reflector));
  app.enableCors({
    origin: '*',
  });
  await app.listen(3000);
}
bootstrap();
