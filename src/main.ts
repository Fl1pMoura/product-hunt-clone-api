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

  // Usando process.env.PORT para garantir que a aplicação use a porta correta no Fly.io
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0', () => {
    console.log(`Application is running on: http://0.0.0.0:${port}`);
  });
}
bootstrap();
